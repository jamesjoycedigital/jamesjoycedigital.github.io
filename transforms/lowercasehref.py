import os
import re

pattern=  r'href=".+?"|src=".+?"'

def lower(x):
    match = x.group()
    lowermatch = match.lower()
    if match != lowermatch:
        #check
        print(match)
        print(lowermatch)
    if "google" in match or "www." in match or "http" in match:
        return match
    return lowermatch

def lowercase_href_recursive( dir ):
    # look through all sub folders and replace href with lowercase    
    def swap( root, items):
        for name in items:
            try:
                path = os.path.join(root, name)
                if ".htm" in path or "snippet" in path:
                    with open(path,"r") as fin:
                        text = fin.read()
                        newtext=re.sub(pattern, lambda x: lower(x),text)
                    with open(path,"w") as fout:
                        fout.write(newtext)


                              
            except Exception as e:
                print(path)
                print(e)
                pass 

    # starts from the bottom so paths further up remain valid after renaming
    for root, dirs, files in os.walk( dir, topdown=False ):    
        swap( root, files)


def lowercase_one_file(file_path):
    with open(file_path,"r") as fin:
            text = fin.read()
            newtext=re.sub(pattern, lambda x: lower(x),text)
    with open(file_path,"w") as fout:
            fout.write(newtext)


lowercase_href_recursive("f/ff/app")
# lowercase_one_file("f/fwhome.htm")
# lowercase_one_file("jjdaacknow.htm")
# lowercase_one_file("jjdahome.htm")