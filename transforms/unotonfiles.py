import os
import re

snip_dir = "snippet"
notebook_dir = "u/ff/unbs"

buckets = {}

# print(os.listdir(notebook_dir))


for f in os.listdir(notebook_dir):
    if "all.htm" in f:
        parts = f.split("all")
        buckets[parts[0]] = f.replace(".htm", "").replace(".html", "")
print(buckets.values())


with open("transforms/Unotons.csv","r",encoding='ISO-8859-1') as f:
    lines = f.readlines()

for line in lines:
    parts = line.split("|")
    code = parts[0].replace("?", "").strip()
    html = parts[1].strip()
    title = parts[2].strip()
    
    bucket = "chicken"

    for k, v in buckets.items():
        if code.startswith(k):            
            bucket = v
        if title == "Notebook Description":
            bucket = "unbdetails"

    # temp
    if bucket != "unbdetails":
        continue

    
    folder = f"{snip_dir}/{bucket}"
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