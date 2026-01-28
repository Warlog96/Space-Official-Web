
import os
import glob

directory = r'c:\Users\avaneesh\OneDrive\Documents\Desktop\Fianl-final-web\images'
whatsapp_pattern = os.path.join(directory, 'WhatsApp Image *.jpeg')
whatsapp_files = sorted(glob.glob(whatsapp_pattern))

start_index = 11

# Rename WhatsApp images
for i, file_path in enumerate(whatsapp_files):
    new_name = f'Slide{start_index + i}.jpeg'
    new_path = os.path.join(directory, new_name)
    try:
        os.rename(file_path, new_path)
        print(f'Renamed "{os.path.basename(file_path)}" to "{new_name}"')
    except Exception as e:
        print(f'Error renaming "{os.path.basename(file_path)}": {e}')

# Fix slide10.jpeg case if it exists
slide10_lower = os.path.join(directory, 'slide10.jpeg')
slide10_upper = os.path.join(directory, 'Slide10.jpeg')

if os.path.exists(slide10_lower) and not os.path.exists(slide10_upper):
    try:
        os.rename(slide10_lower, slide10_upper)
        print('Renamed "slide10.jpeg" to "Slide10.jpeg"')
    except Exception as e:
        print(f'Error renaming slide10: {e}')
