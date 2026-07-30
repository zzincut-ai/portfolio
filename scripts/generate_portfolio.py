import os
import json
import re
import sys

# Force stdout to use UTF-8 encoding on Windows to prevent UnicodeEncodeError in terminal
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')


# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # portfolio directory
VIDEOS_DIR = os.path.join(BASE_DIR, "assets", "videos")
JSON_PATH = os.path.join(BASE_DIR, "assets", "videos.json")

def load_videos():
    if os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading JSON: {e}")
    return []

def get_video_dimensions_hachoir(filepath):
    try:
        from hachoir.parser import createParser
        from hachoir.metadata import extractMetadata
        
        parser = createParser(filepath)
        if not parser:
            return None, None
        with parser:
            metadata = extractMetadata(parser)
        if metadata:
            width = metadata.get('width')
            height = metadata.get('height')
            return width, height
    except Exception as e:
        # Fallback will handle cases where hachoir fails
        pass
    return None, None

APP_JS_PATH = os.path.join(BASE_DIR, "app.js")

def update_app_js_backup(data):
    if not os.path.exists(APP_JS_PATH):
        print(f"app.js not found at {APP_JS_PATH}")
        return
    try:
        with open(APP_JS_PATH, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Format the data as JS array with proper indentation
        js_data = json.dumps(data, ensure_ascii=False, indent=8)
        
        replacement = f"const backupData = {js_data};"
        new_content = re.sub(r"const backupData\s*=\s*\[.*?\];", replacement, content, flags=re.DOTALL)
        
        with open(APP_JS_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully synchronized app.js backupData")
    except Exception as e:
        print(f"Error updating app.js backupData: {e}")

def save_videos(data):
    try:
        with open(JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("Successfully updated videos.json")
        update_app_js_backup(data)
    except Exception as e:
        print(f"Error saving JSON: {e}")

def main():
    videos = load_videos()
    existing_urls = {item["url"] for item in videos}
    existing_titles = {item["title"].strip(): i for i, item in enumerate(videos)}

    if not os.path.exists(VIDEOS_DIR):
        print(f"Videos directory {VIDEOS_DIR} does not exist.")
        return

    # List all mp4 files
    files = os.listdir(VIDEOS_DIR)
    new_items = []
    has_updates = False

    for file in files:
        if not file.lower().endswith(".mp4"):
            continue
            
        # Ignore raw unbracketed placeholder names already mapped to avoid duplication
        if file.lower() in ["chicken.mp4", "runwaly.mp4"]:
            continue
        
        # Build relative url
        url = f"assets/videos/{file}"
        
        # Parse Category and Title from filename
        # Pattern: [Category] Title_v.mp4 or [Category] Title.mp4
        base_name = os.path.splitext(file)[0]
        
        # Regex search for brackets
        match = re.match(r"^\[([^\]]+)\]\s*(.*?)$", base_name)
        
        category = "로컬 브랜드 & B2B"  # Default Category
        title = base_name
        is_vertical = False
        
        if match:
            category = match.group(1).strip()
            title = match.group(2).strip()
            
            # Normalize category names that contain illegal characters in Windows filenames (e.g. slash)
            if category in ["실제 촬영 편집", "실제 촬영_편집", "실제 촬영-편집"]:
                category = "실제 촬영/편집"
            
        # Always clean _v suffix from display title if present
        display_title = title
        if display_title.lower().endswith("_v"):
            display_title = display_title[:-2].strip()
            
        # Check video properties to auto-detect ratio
        filepath = os.path.join(VIDEOS_DIR, file)
        width, height = get_video_dimensions_hachoir(filepath)
        
        is_vertical = False
        if width is not None and height is not None:
            if height >= width: # Treat square (1:1) videos as vertical
                is_vertical = True
                print(f"Auto-detected vertical aspect ratio ({width}x{height}) for {file}")
            else:
                print(f"Auto-detected horizontal aspect ratio ({width}x{height}) for {file}")
        else:
            # Fallback to filename suffix '_v' if hachoir is unavailable or failed
            if base_name.lower().endswith("_v") or file.lower().endswith("_v.mp4"):
                is_vertical = True
                print(f"Filename fallback: detected vertical suffix for {file}")
                
        title = display_title
            
        # Check if description txt file exists
        txt_filename = base_name + ".txt"
        txt_path = os.path.join(VIDEOS_DIR, txt_filename)
        description = "AI 기술을 활용해 제작한 고화질 비디오 콘텐츠입니다."  # Default Description
        
        if os.path.exists(txt_path):
            try:
                with open(txt_path, "r", encoding="utf-8") as f:
                    description = f.read().strip()
            except Exception as e:
                print(f"Error reading description file {txt_filename}: {e}")

        # 만약 기존에 동일한 제목의 비디오(유튜브 임베드 등)가 이미 등록되어 있다면 해당 항목을 업데이트 (중복 방지)
        if title in existing_titles:
            idx = existing_titles[title]
            new_type = "vertical" if is_vertical else "horizontal"
            
            # 변경사항이 있을 때만 업데이트 실행 및 저장 플래그 세팅
            if videos[idx]["url"] != url or videos[idx]["type"] != new_type or videos[idx]["category"] != category:
                videos[idx]["url"] = url
                videos[idx]["type"] = new_type
                videos[idx]["category"] = category
                if os.path.exists(txt_path):
                    videos[idx]["description"] = description
                print(f"Updating existing video to local path: {title} in category {category} (type: {new_type})")
                has_updates = True
            existing_urls.add(url)
            continue
                
        new_item = {
            "category": category,
            "title": title,
            "description": description,
            "url": url,
            "type": "vertical" if is_vertical else "horizontal"
        }
        
        print(f"Adding new video: {title} in category {category}")
        new_items.append(new_item)

    # 폴더에서 로컬 비디오 파일이 삭제된 경우, 데이터베이스에서도 자동으로 제거
    cleaned_videos = []
    for item in videos:
        url = item["url"]
        is_local = url.lower().endswith(".mp4") or "assets/videos/" in url
        
        if is_local:
            # URL 디코딩하여 실제 파일 이름과 대조
            from urllib.parse import unquote
            filename = os.path.basename(unquote(url))
            filepath = os.path.join(VIDEOS_DIR, filename)
            
            # 파일이 더 이상 존재하지 않는다면 데이터베이스에서 제외
            if not os.path.exists(filepath):
                print(f"Detected deleted local video file. Removing from database: {item['title']}")
                has_updates = True
                continue
        cleaned_videos.append(item)
    videos = cleaned_videos

    if new_items:
        # Prepend new items to keep recent items first
        videos = new_items + videos
        save_videos(videos)
    elif has_updates:
        save_videos(videos)
    else:
        print("No new videos or updates to apply.")

if __name__ == "__main__":
    main()
