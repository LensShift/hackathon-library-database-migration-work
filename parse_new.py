#! /usr/bin/ python
"""Parse text files and return CSV."""

from os import listdir
import re
import pandas as pd
from parse import text_to_dict, COLUMNS

TXT_DIR = 'data/txts/'
SAVE_DIR = 'data/'
files = listdir(TXT_DIR)


def main():
    """Return CSV."""
    files = listdir(TXT_DIR)
    regex_list = ['([\ufeff|\n]' + x + ':\s)' for x in COLUMNS]
    dicts = []

    for k, file in enumerate(files):
        with open(TXT_DIR + file) as f:
            content = f.read().strip()
            # turn to dict:
            data_dict = text_to_dict(content, regex_list)
            data_dict['filename'] = file[:-3] 
            dicts.append(data_dict)

    df = pd.DataFrame(dicts)
    print(df.shape)
    new_file = SAVE_DIR + 'updated_df.csv'
    df.to_csv(new_file, header=True, index=False)
    print('File saved to ' + new_file)
    return df

if __name__ == '__main__':
    main()
