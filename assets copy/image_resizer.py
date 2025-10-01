import os
from PIL import Image

# =======================
# CONFIGURATION
# =======================
input_folders = [
    r"D:\Kaivan\Coding and Projects\Discord Projects\Real Gods Website\assets\hero",
    r"D:\Kaivan\Coding and Projects\Discord Projects\Real Gods Website\assets\tournaments"
]

# Fixed dimensions (width x height)
target_width = 1920
target_height = 1080

# If True → overwrite original images
# If False → save with "_resized" suffix
overwrite = True

valid_extensions = (".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tiff")


def resize_fixed(img, width, height):
    """Resize image to fixed dimensions (may distort aspect ratio)."""
    return img.resize((width, height), Image.LANCZOS)


def process_folder(input_dir, width, height, overwrite=False):
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(valid_extensions):
            filepath = os.path.join(input_dir, filename)
            try:
                with Image.open(filepath) as img:
                    new_img = resize_fixed(img, width, height)

                    if overwrite:
                        save_path = filepath  # overwrite original
                    else:
                        name, ext = os.path.splitext(filename)
                        save_path = os.path.join(input_dir, f"{name}_resized{ext}")

                    new_img.save(save_path)
                    print(f"Processed and saved: {save_path}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")


if __name__ == "__main__":
    for folder in input_folders:
        process_folder(folder, target_width, target_height, overwrite=overwrite)
