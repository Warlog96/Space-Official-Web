
import os
import re

# Configuration
directory = r"c:\Users\avaneesh\OneDrive\Documents\Desktop\website"
target_files_pattern = r"^project-.*\.html$"

def get_file_content(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file_content(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # Fix the double comments issue
    for filename in os.listdir(directory):
        if re.match(target_files_pattern, filename):
            filepath = os.path.join(directory, filename)
            
            content = get_file_content(filepath)
            original_content = content
            
            # Simple string replacements to fix the double commenting
            if '<!-- <!-- <style>' in content:
                content = content.replace('<!-- <!-- <style>', '<!-- <style>')
                print(f"Fixed double start comment in {filename}")
            
            if '</style> --> -->' in content:
                content = content.replace('</style> --> -->', '</style> -->')
                print(f"Fixed double end comment in {filename}")

            if content != original_content:
                write_file_content(filepath, content)
                print(f"Saved {filename}")
            else:
                print(f"No changes needed for {filename}")

if __name__ == "__main__":
    main()
