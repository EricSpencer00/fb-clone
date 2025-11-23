#!/usr/bin/env python3
import sys
import os
import io
import mimetypes
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

DIST_DIR = os.path.join(os.path.dirname(__file__), '..', 'dist')

class ProxyHandler(BaseHTTPRequestHandler):
    target_base = ''

    def do_request(self):
        path = self.path
        if path.startswith('/api/'):
            self.proxy_api()
            return
        # Serve static files from dist
        if path == '/' or path == '':
            path = '/index.html'
        local_path = os.path.normpath(os.path.join(DIST_DIR, path.lstrip('/')))
        if not local_path.startswith(os.path.normpath(DIST_DIR)):
            self.send_error(403)
            return
        if os.path.exists(local_path) and os.path.isfile(local_path):
            self.serve_file(local_path)
            return
        # SPA fallback
        index_path = os.path.join(DIST_DIR, 'index.html')
        if os.path.exists(index_path):
            self.serve_file(index_path)
            return
        self.send_error(404)

    def serve_file(self, local_path):
        try:
            ctype, _ = mimetypes.guess_type(local_path)
            if ctype is None:
                ctype = 'application/octet-stream'
            with open(local_path, 'rb') as f:
                data = f.read()
            self.send_response(200)
            self.send_header('Content-Type', ctype)
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, str(e))

    def proxy_api(self):
        url = self.target_base.rstrip('/') + self.path
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length) if length > 0 else None
        req = Request(url, data=body, method=self.command)
        # copy headers, but override Host
        for k in self.headers:
            if k.lower() in ('host', 'content-length', 'accept-encoding', 'connection'):
                continue
            req.add_header(k, self.headers[k])
        try:
            resp = urlopen(req, timeout=15)
            resp_body = resp.read()
            self.send_response(resp.getcode())
            for header_key, header_value in resp.getheaders():
                # Skip hop-by-hop headers
                if header_key.lower() in ('transfer-encoding', 'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade'):
                    continue
                self.send_header(header_key, header_value)
            self.end_headers()
            if resp_body:
                self.wfile.write(resp_body)
        except HTTPError as e:
            try:
                body = e.read()
            except Exception:
                body = None
            self.send_response(e.code)
            for k, v in e.headers.items():
                if k.lower() in ('transfer-encoding', 'connection'):
                    continue
                self.send_header(k, v)
            self.end_headers()
            if body:
                self.wfile.write(body)
        except URLError as e:
            self.send_error(502, str(e))
        except Exception as e:
            self.send_error(500, str(e))

    def do_GET(self):
        self.do_request()

    def do_POST(self):
        self.do_request()

    def do_PUT(self):
        self.do_request()

    def do_PATCH(self):
        self.do_request()

    def do_DELETE(self):
        self.do_request()

    def log_message(self, format, *args):
        # keep logs concise
        sys.stderr.write("%s - - [%s] %s\n" % (self.client_address[0], self.log_date_time_string(), format%args))

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: proxy_server.py <port> <target_base_url>')
        sys.exit(2)
    port = int(sys.argv[1])
    ProxyHandler.target_base = sys.argv[2]
    os.chdir(os.path.join(os.path.dirname(__file__), '..'))
    server = ThreadingHTTPServer(('0.0.0.0', port), ProxyHandler)
    print(f'Serving dist/ with API proxy to {ProxyHandler.target_base} on port {port}...')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('Shutting down')
        server.shutdown()
