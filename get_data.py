from __future__ import print_function
import httplib2
import os
import io

import requests
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from googleapiclient.http import MediaIoBaseDownload
try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/drive-python-quickstart.json
# SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'
# allow LensShift to view files changed with the app:
SCOPES = 'https://www.googleapis.com/auth/drive.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Drive API Python Quickstart'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'drive-python-quickstart.json')

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

def main():
    """Parse file and save data to csv."""
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('drive', 'v3', http=http)
    results = service.files().list(q="parents='0B1d9_Q8R8M-0VXBOTTRtYV9md3M'",
        pageSize=5,fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])
    if not items:
        print('No files found.')
    else:
        print('Files:')
        for item in items:
            print('{0} ({1})'.format(item['name'], item['id']))

    # download the last file:
    FileId = item['id']
    # print("ID :%s, mimeType: %s" % (item['id'], item['mimeType']))
    # google docs require a separate method, 'export':
    # response = requests.get("https://www.googleapis.com/drive/v3/files/" + fileId + "/export?format=doc")
    request = "https://docs.google.com/feeds/download/documents/export/Export?id=" +FileId+"&exportFormat=txt"
    
    response = requests.get(request)
    
    with open('output.txt', mode='wb') as localfile:
    	localfile.write(response.content)
    # with open('output.txt', 'wb') as handle:
    # 	for block in response.iter_content(1024):
    #     	handle.write(block)
    # request = service.files().get_media(fileId=file_id)
    # fh = io.BytesIO()
    # downloader = MediaIoBaseDownload(fh, request)
    # done = False
    # while done is False:
    # 	status, done = downloader.next_chunk()
    # 	print("Download %d%%." % int(status.progress() * 100))


if __name__ == '__main__':
    main()
