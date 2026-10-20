# Loads the built app in a WebKit2GTK WebView and fails on any error reported by the in-page diagnostic console
# (window.onerror, console.error) or when the app does not reach the connected state in time.
# The probe result is passed back through document.title, which works with every WebKit2GTK version.
import json
import os
import sys

import gi

gi.require_version("Gtk", "3.0")
gi.require_version("WebKit2", "4.0")
from gi.repository import GLib, Gtk, WebKit2  # noqa: E402

APP_URL = os.environ.get("APP_URL", "http://app/app/?host=venus&port=9001&path=%02%03")
TIMEOUT = int(os.environ.get("TIMEOUT", "60"))
NAME = os.environ.get("NAME", "webkitgtk")
# the probe is used as an expression below: drop comment lines and the leading ";" prettier puts before the IIFE
PROBE = "\n".join(
    line for line in open(os.path.join(os.path.dirname(__file__), "probe.js")).read().splitlines() if not line.lstrip().startswith("//")
).strip().lstrip(";")

window = Gtk.OffscreenWindow()
view = WebKit2.WebView()
window.add(view)
window.set_default_size(1280, 720)
window.show_all()


def on_load_changed(_view, event):
    print("[%s] load %s %s" % (NAME, event.value_nick, view.get_uri()), flush=True)


def on_load_failed(_view, _event, uri, error):
    print("[%s] load failed %s: %s" % (NAME, uri, error), flush=True)
    return False


view.connect("load-changed", on_load_changed)
view.connect("load-failed", on_load_failed)

print("[%s] %s" % (NAME, view.get_settings().get_user_agent()), flush=True)

state = {"elapsed": 0, "result": None}


def finish(result):
    state["result"] = result
    Gtk.main_quit()


def poll():
    state["elapsed"] += 1
    title = view.get_title() or ""
    if state["elapsed"] % 10 == 0:
        print("[%s] t+%ds title=%s" % (NAME, state["elapsed"], title[:120]), flush=True)
    if title.startswith("PROBE_ERROR"):
        print("[%s] %s" % (NAME, title), flush=True)
        finish(None)
        return False
    if title.startswith("{"):
        try:
            result = json.loads(title)
            if result.get("ready") or result.get("errors") or state["elapsed"] >= TIMEOUT:
                finish(result)
                return False
        except ValueError:
            pass
    elif state["elapsed"] >= TIMEOUT:
        finish(None)
        return False
    # the exception message of a failing probe is not available through the GTK binding, pass it via the title
    view.run_javascript(
        'document.title = (function () { try { return (\n%s\n) } catch (e) { return "PROBE_ERROR: " + e.message } })()' % PROBE,
        None,
        on_javascript_done,
    )
    return True


def on_javascript_done(_view, result):
    try:
        view.run_javascript_finish(result)
    except Exception as e:  # noqa: BLE001
        print("[%s] probe failed: %s" % (NAME, e), flush=True)


view.load_uri(APP_URL)
GLib.timeout_add_seconds(1, poll)
Gtk.main()

result = state["result"]
print("[%s] state: %s" % (NAME, json.dumps(result)), flush=True)
failed = not result or not result.get("ready") or len(result.get("errors", [])) > 0
print("[%s] %s" % (NAME, "FAILED" if failed else "OK"), flush=True)
sys.exit(1 if failed else 0)
