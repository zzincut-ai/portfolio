import http.server, functools
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()
http.server.ThreadingHTTPServer(("0.0.0.0", 8123), functools.partial(H, directory="/mnt/c/Users/zzinc/orca/projects/CLAUDE/websites/portfolio")).serve_forever()
