import os
import re

snip_dir = "f/ff/snippet"
notebook_dir = "f/ff/fnbs"

buckets = {}

# print(os.listdir(notebook_dir))


for f in os.listdir(notebook_dir):
    if "all.htm" in f:
        parts = f.split("all")
        buckets[parts[0]] = f.replace(".htm", "").replace(".html", "")
bucketlist= list(buckets.values())
bucketlist.sort()
print(bucketlist)

titles = set()
with open("transforms/Fnotons.csv","r",encoding='ISO-8859-1') as f:
    lines = f.readlines()

for line in lines:
    parts = line.split("|")    
    code = parts[0].replace("?", "").strip()
    if len(parts)> 4:       
        html = "|".join(parts[1:-2]).strip()
    else:
        html = parts[1]
    title = parts[-2].strip()    
    titles.add(title)
        
    bucket = "chicken"

    for k, v in buckets.items():
        if code.startswith(k):            
            bucket = v
        if title == "Notebook Description":
            bucket = "unbdetails"

    # # temp
    # if bucket != "unbdetails":
    #     continue

    
    folder = f"{snip_dir}/{bucket}"
    folder = folder.lower()
    if not (os.path.exists(folder)):
        os.makedirs(folder)
    file_dest = f"{folder}/{code}"
    file_dest = file_dest.lower()
    print(file_dest)
    with open(file_dest, 'w+', encoding='utf-8') as fout:
        fout.write(f"<div id=\"stitle\" style=\"display:none;\">{title}</div>")
        fout.write("\n")
        fout.write(html)
        fout.write("\n")

print(titles)