#!/usr/bin/python3

# Downloads latest artifact from proteinscreener and unzips
# it in the public directory

import urllib.request, json, sys, tempfile, zipfile, os
from operator import itemgetter

token = os.environ['GH_TOKEN']
url = "https://api.github.com/repos/vu-promiss/proteine-screener/actions/artifacts"

def download_url(url, directory_to_extract_to):
    with tempfile.TemporaryDirectory() as tmpdirname:
        save_path = os.path.join(tmpdirname, "artifact.zip")
        request = urllib.request.Request(url)
        request.add_header("Authorization",  f'token {token}')

        with urllib.request.urlopen(request) as dl_file:
            with open(save_path, 'wb') as out_file:
                out_file.write(dl_file.read())
        with zipfile.ZipFile(save_path, 'r') as zip_ref:
                zip_ref.extractall(directory_to_extract_to)

rootdir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
target_dir = os.path.join(rootdir, "public")

req = urllib.request.Request(url)

##parsing response
r = urllib.request.urlopen(req).read()
cont = json.loads(r.decode('utf-8'))

if cont['total_count'] < 1:
    print('No artifacts found')
    sys.exit()

# Filter list
artifacts = [d for d in cont['artifacts'] if d['name'] == 'frontend-only']

# Get most recent item
item = sorted(artifacts, key=itemgetter('created_at'), reverse=False).pop()

if item['expired']:
    print('Most recent artifact has expired')
    sys.exit()

download_url(item['archive_download_url'], target_dir)

