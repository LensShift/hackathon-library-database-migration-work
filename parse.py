#! /usr/bin/ python

"""Parse text files and return CSV.

WARNING!! Deprecated.
"""

from os import listdir
import re
import pandas as pd


DATA_DIR = "data/txts/"
SAVE_DIR = 'data/'

COLUMNS = ['Resource Title|Title', 'Author/Creator', 'Date Published', 'Type', 'Link',
            'Estimated Reading/Viewing Time', 
          'Date Drafted', 'LS Initial Author', 'LS Reviewer\(s\)',
          'Short Summary', 'Tags', 'Long Summary', 'Key Takeaways', 'Other Notes', 
           # extras: 
           'LS Author', 'Summary']

# REGEXES = ['([\ufeff|\n]' + x + ':\s)' for x in COLUMNS]


def text_to_dict(content, regex_list):
    """Turn plain text file into dictionary."""
    rsplit = re.compile("|".join(regex_list))
    splits = re.split(rsplit, content)
    splits = [split for split in splits if split is not None]
    evens = [splits[i] for i in range(len(splits)) if ((i % 2) == 0) and (i != 0)]
    odds = [splits[i] for i in range(len(splits)) if (i % 2) != 0]
    zipped = zip(odds, evens)
    
    # split based on columns:
    data_dict = {}
    for (data_name, data_val) in zipped:
    
        # clean column name for dictionary:
        colname = data_name.strip()
        if '\ufeff' in colname:
            colname = colname.replace('\ufeff', '')
        colname = colname.replace(':', '')
        
        if colname == 'Title':
            colname = 'Resource Title'

        # if semicolon left at start of line:
        pat = r'^:\s'
        if re.match(pat, data_val) is not None:
            data_val = data_val[2:]
        data_dict[colname] = data_val

    return data_dict


def parse(file, data_dir, regex_list):
    """Parse contents of text file."""
    with open(data_dir + file) as f:
        content = f.read().strip()
        data_dict = text_to_dict(content, regex_list)
        data_dict['filename'] = file[:-3]  # remove ending
    return data_dict


def main():
    files = listdir(DATA_DIR)
    regex_list = ['([\ufeff|\n]' + x + ':\s)' for x in COLUMNS]
    data_dicts = []
    for k, file in enumerate(files):
        data_dict = parse(file, DATA_DIR, regex_list)
        data_dicts.append(data_dict)
    # turn list of dicts into one big dataframe:

    df = pd.DataFrame(data_dicts)
    # save dataframe to csv:
    df.to_csv(SAVE_DIR + 'df.csv')
    print(df.columns)
    print('Done!')


if __name__ == '__main__':
    main()
