
import os
import re

# Configuration
directory = r"c:\Users\avaneesh\OneDrive\Documents\Desktop\website"
source_file = os.path.join(directory, "index.html")
target_files_pattern = r"^project-.*\.html$"

def get_file_content(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file_content(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_section(content, tag):
    # Regex to find content between <tag ...> and </tag>
    # This matches the first occurrence, which is what we want for header/footer
    pattern = re.compile(f'(<{tag}.*?>.*?</{tag}>)', re.DOTALL | re.IGNORECASE)
    match = pattern.search(content)
    if match:
        return match.group(1)
    return None

def main():
    # 1. Get standard header and footer from index.html
    index_content = get_file_content(source_file)
    standard_header = extract_section(index_content, 'header')
    standard_footer = extract_section(index_content, 'footer')

    if not standard_header or not standard_footer:
        print("Error: Could not extract header or footer from index.html")
        return

    # 2. Process project files
    for filename in os.listdir(directory):
        if re.match(target_files_pattern, filename):
            filepath = os.path.join(directory, filename)
            print(f"Processing {filename}...")
            
            content = get_file_content(filepath)
            
            # A. Add styles.css link if missing
            if 'href="styles.css"' not in content and "href='styles.css'" not in content:
                # Insert before </head> or other stylesheets
                if '</head>' in content:
                    content = content.replace('</head>', '    <link rel="stylesheet" href="styles.css">\n</head>')
                print("  - Added styles.css link")

            # B. Comment out internal <style> block
            # careful with multiple style blocks, usually there's one main one in head
            style_pattern = re.compile(r'(<style>.*?</style>)', re.DOTALL | re.IGNORECASE)
            
            # Function to comment out the match
            def comment_out(match):
                return "<!-- " + match.group(1).replace("-->", "-- >") + " -->"
            
            content, n = style_pattern.subn(comment_out, content)
            if n > 0:
                print(f"  - Commented out {n} internal <style> block(s)")

            # C. Replace Header
            # We need to find the existing header block and replace it
            header_pattern = re.compile(r'(<header.*?>.*?</header>)', re.DOTALL | re.IGNORECASE)
            if header_pattern.search(content):
                content = header_pattern.sub(standard_header, content, count=1)
                print("  - Replaced header")
            else:
                 print("  - Header not found to replace")

            # D. Replace Footer
            footer_pattern = re.compile(r'(<footer.*?>.*?</footer>)', re.DOTALL | re.IGNORECASE)
            if footer_pattern.search(content):
                content = footer_pattern.sub(standard_footer, content, count=1)
                print("  - Replaced footer")
            else:
                print("  - Footer not found to replace")
            
            write_file_content(filepath, content)
            print("  - Saved.")

if __name__ == "__main__":
    main()
