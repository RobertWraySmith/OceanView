import sys
import uuid 
import json
from shutil import copyfile
  

def usage():
    print(f'add_image <catalog-json-file> <image-file> <title> <location> <date> [<comment>]')
    print(f'  <catalog-json-file> - path of existing "catalog.json", or "-" for new file')
    print(f'  <image-file> - the image file to add')
    print(f'  <title> - the title string for the image')
    print(f'  <location> - the location string for the image')
    print(f'  <date> - the date string for the image')
    print(f'  <comment> - optional comment string for the image')
    sys.exit()


def read_catalog(catalog_path):
    if catalog_path == '-':
        return []
    with open(catalog_path, 'r') as infile: 
        return json.load(infile) 


def create_image_file(image_file, image_copy):
    try:
        copyfile(image_file, image_copy)
    except IOError as e:
        print(f'Failure to copy {image_file} to {image_copy}: {e}', file=sys.stderr)
        raise e


def make_entry(id, title, location, date, comment = None):
    entry = {}
    entry['id'] = id
    entry['title'] = title
    entry['location'] = location
    entry['date'] = date
    entry['width'] = 3
    entry['height'] = 2
    if comment is not None:
        entry['comment'] = comment
    return entry


def main():

    if (len(sys.argv) < 6) or (len(sys.argv) > 7):
        usage()

    image_id = str(uuid.uuid4())
    catalog_file = sys.argv[1]
    image_file = sys.argv[2]
    title = sys.argv[3]
    location = sys.argv[4]
    date = sys.argv[5]
    comment = sys.argv[6] if len(sys.argv) > 6 else None

    catalog = read_catalog(sys.argv[1])
    create_image_file(image_file, image_id + '.jpeg')
    entry = make_entry(image_id, title, location, date, comment)
    catalog.append(entry)

    catalog_json = json.dumps(catalog) 
    print(f'{catalog_json}')
    

if __name__ == '__main__':
    main()
