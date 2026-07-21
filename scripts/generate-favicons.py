import os
import zlib
import struct
import math

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')

def clamp(val, min_v=0.0, max_v=255.0):
    return max(min_v, min(max_v, float(val)))

def lerp(a, b, t):
    return a + (b - a) * t

BLUE_COLOR = (59, 130, 246)     # #3B82F6
CYAN_COLOR = (6, 182, 212)      # #06B6D4
WHITE_COLOR = (248, 250, 252)   # #F8FAFC

def sd_rounded_box(px, py, bx, by, rx, ry, radius):
    dx = abs(px - bx) - (rx - radius)
    dy = abs(py - by) - (ry - radius)
    ax = max(dx, 0.0)
    ay = max(dy, 0.0)
    inside = min(max(dx, dy), 0.0)
    return math.sqrt(ax * ax + ay * ay) + inside - radius

def sd_segment(px, py, ax, ay, bx, by):
    pax, pay = px - ax, py - ay
    bax, bay = bx - ax, by - ay
    h = max(0.0, min(1.0, (pax * bax + pay * bay) / (bax * bax + bay * bay + 1e-9)))
    dx = pax - bax * h
    dy = pay - bay * h
    return math.sqrt(dx * dx + dy * dy)

def render_icon_pixel(x, y, width, height, is_maskable=False):
    nx = (x / max(1, width - 1)) * 2.0 - 1.0
    ny = (y / max(1, height - 1)) * 2.0 - 1.0
    
    scale = 0.75 if is_maskable else 0.9
    sx = nx / scale
    sy = ny / scale
    
    dist_box = sd_rounded_box(sx, sy, 0, 0, 0.95, 0.95, 0.3) if not is_maskable else -1.0
    
    if dist_box > 0.05:
        return (0, 0, 0, 0)
    
    t = (sy + 1.0) / 2.0
    bg_r = lerp(15, 11, t)
    bg_g = lerp(23, 17, t)
    bg_b = lerp(42, 32, t)
    
    border_dist = abs(dist_box)
    if not is_maskable and border_dist < 0.04:
        border_t = 0.5 + 0.5 * sx
        br = lerp(BLUE_COLOR[0], CYAN_COLOR[0], border_t)
        bg = lerp(BLUE_COLOR[1], CYAN_COLOR[1], border_t)
        bb = lerp(BLUE_COLOR[2], CYAN_COLOR[2], border_t)
        alpha = clamp((0.04 - border_dist) / 0.04 * 255.0)
        return (int(clamp(br)), int(clamp(bg)), int(clamp(bb)), int(clamp(alpha)))

    sw = 0.09
    d_left = sd_segment(sx, sy, -0.55, -0.35, -0.75, 0.0)
    d_left = min(d_left, sd_segment(sx, sy, -0.75, 0.0, -0.55, 0.35))
    
    d_d_stem = sd_segment(sx, sy, -0.4, -0.35, -0.4, 0.35)
    d_d_arc = 1e9
    for i in range(8):
        a1 = (i / 8.0) * math.pi - math.pi / 2.0
        a2 = ((i + 1) / 8.0) * math.pi - math.pi / 2.0
        x1 = -0.4 + 0.32 * math.cos(a1)
        y1 = 0.35 * math.sin(a1)
        x2 = -0.4 + 0.32 * math.cos(a2)
        y2 = 0.35 * math.sin(a2)
        d_d_arc = min(d_d_arc, sd_segment(sx, sy, x1, y1, x2, y2))
    
    d_k_stem = sd_segment(sx, sy, 0.1, -0.35, 0.1, 0.35)
    d_k_arm1 = sd_segment(sx, sy, 0.1, 0.0, 0.38, -0.35)
    d_k_arm2 = sd_segment(sx, sy, 0.15, -0.05, 0.4, 0.35)

    d_right = sd_segment(sx, sy, 0.55, -0.35, 0.75, 0.0)
    d_right = min(d_right, sd_segment(sx, sy, 0.75, 0.0, 0.55, 0.35))
    
    d_cyan_parts = min(d_left, d_right, d_k_stem, d_k_arm1, d_k_arm2)
    d_white_parts = min(d_d_stem, d_d_arc)

    col_r, col_g, col_b = bg_r, bg_g, bg_b
    
    dist_c = d_cyan_parts - sw / 2.0
    if dist_c < 0.03:
        factor = clamp((0.03 - dist_c) / 0.03, 0.0, 1.0)
        gt = (sx + 1.0) / 2.0
        gr = lerp(BLUE_COLOR[0], CYAN_COLOR[0], gt)
        gg = lerp(BLUE_COLOR[1], CYAN_COLOR[1], gt)
        gb = lerp(BLUE_COLOR[2], CYAN_COLOR[2], gt)
        col_r = lerp(col_r, gr, factor)
        col_g = lerp(col_g, gg, factor)
        col_b = lerp(col_b, gb, factor)
        
    dist_w = d_white_parts - sw / 2.0
    if dist_w < 0.03:
        factor = clamp((0.03 - dist_w) / 0.03, 0.0, 1.0)
        col_r = lerp(col_r, WHITE_COLOR[0], factor)
        col_g = lerp(col_g, WHITE_COLOR[1], factor)
        col_b = lerp(col_b, WHITE_COLOR[2], factor)

    return (int(clamp(col_r)), int(clamp(col_g)), int(clamp(col_b)), 255)

def generate_png(width, height, is_maskable=False):
    ss = 2 if width <= 192 else 1
    sw, sh = width * ss, height * ss
    
    raw_rows = bytearray()
    for y in range(height):
        raw_rows.append(0)
        for x in range(width):
            if ss > 1:
                acc_r, acc_g, acc_b, acc_a = 0, 0, 0, 0
                for sy in range(ss):
                    for sx in range(ss):
                        px = x * ss + sx
                        py = y * ss + sy
                        r, g, b, a = render_icon_pixel(px, py, sw, sh, is_maskable)
                        acc_r += r
                        acc_g += g
                        acc_b += b
                        acc_a += a
                n = ss * ss
                raw_rows.extend([
                    int(clamp(acc_r // n)),
                    int(clamp(acc_g // n)),
                    int(clamp(acc_b // n)),
                    int(clamp(acc_a // n))
                ])
            else:
                r, g, b, a = render_icon_pixel(x, y, width, height, is_maskable)
                raw_rows.extend([r, g, b, a])

    png_sig = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    ihdr_chunk = struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)

    compressed = zlib.compress(bytes(raw_rows), 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    idat_chunk = struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)

    iend_crc = zlib.crc32(b'IEND')
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)

    return png_sig + ihdr_chunk + idat_chunk + iend_chunk

def generate_ico(png_16, png_32):
    header = struct.pack('<HHH', 0, 1, 2)
    offset = 6 + 16 * 2
    
    entry16 = struct.pack('<BBBBHHII', 16, 16, 0, 0, 1, 32, len(png_16), offset)
    offset += len(png_16)
    
    entry32 = struct.pack('<BBBBHHII', 32, 32, 0, 0, 1, 32, len(png_32), offset)
    
    return header + entry16 + entry32 + png_16 + png_32

def generate_og_image(width=1200, height=630):
    raw_rows = bytearray()
    top_row = bytearray([0])
    for x in range(width):
        t_top = x / max(1, width - 1)
        r = int(clamp(lerp(BLUE_COLOR[0], CYAN_COLOR[0], t_top)))
        g = int(clamp(lerp(BLUE_COLOR[1], CYAN_COLOR[1], t_top)))
        b = int(clamp(lerp(BLUE_COLOR[2], CYAN_COLOR[2], t_top)))
        top_row.extend([r, g, b, 255])
        
    for y in range(height):
        if y < 6:
            raw_rows.extend(top_row)
            continue
            
        raw_rows.append(0)
        ny = y / max(1, height - 1)
        bg_r = lerp(11, 15, ny)
        for x in range(width):
            nx = x / max(1, width - 1)
            bg_g = lerp(17, 23, nx)
            bg_b = lerp(32, 45, (nx + ny) / 2.0)
            
            dx_glow = nx - 0.8
            dy_glow = ny - 0.2
            dist_glow = math.sqrt(dx_glow * dx_glow + dy_glow * dy_glow)
            glow_intensity = max(0.0, 1.0 - dist_glow / 0.6)
            
            r = int(clamp(bg_r + glow_intensity * 30))
            g = int(clamp(bg_g + glow_intensity * 80))
            b = int(clamp(bg_b + glow_intensity * 140))
            raw_rows.extend([r, g, b, 255])

    png_sig = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    ihdr_chunk = struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)

    compressed = zlib.compress(bytes(raw_rows), 6)
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    idat_chunk = struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)

    iend_crc = zlib.crc32(b'IEND')
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)

    return png_sig + ihdr_chunk + idat_chunk + iend_chunk

def main():
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    print("Generating assets into:", PUBLIC_DIR)
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#0B1120" />
    </linearGradient>
    <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#bg-grad)" />
  <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="url(#brand-grad)" stroke-width="6" stroke-opacity="0.5" />

  <g transform="translate(32, 32)">
    <path d="M 110 148 L 40 224 L 110 300" fill="none" stroke="url(#brand-grad)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 160 148 L 160 300 M 160 148 C 235 148, 235 300, 160 300" fill="none" stroke="#F8FAFC" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 255 148 L 255 300 M 255 224 L 315 148 M 265 210 L 325 300" fill="none" stroke="url(#brand-grad)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 375 300 L 408 148" fill="none" stroke="url(#brand-grad)" stroke-width="28" stroke-linecap="round" />
  </g>
</svg>"""

    with open(os.path.join(PUBLIC_DIR, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("[OK] Created favicon.svg")
    
    png_16 = generate_png(16, 16)
    with open(os.path.join(PUBLIC_DIR, 'favicon-16x16.png'), 'wb') as f:
        f.write(png_16)
    print("[OK] Created favicon-16x16.png")

    png_32 = generate_png(32, 32)
    with open(os.path.join(PUBLIC_DIR, 'favicon-32x32.png'), 'wb') as f:
        f.write(png_32)
    print("[OK] Created favicon-32x32.png")

    png_180 = generate_png(180, 180)
    with open(os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 'wb') as f:
        f.write(png_180)
    print("[OK] Created apple-touch-icon.png")

    png_192 = generate_png(192, 192)
    with open(os.path.join(PUBLIC_DIR, 'icon-192.png'), 'wb') as f:
        f.write(png_192)
    print("[OK] Created icon-192.png")

    png_512 = generate_png(512, 512)
    with open(os.path.join(PUBLIC_DIR, 'icon-512.png'), 'wb') as f:
        f.write(png_512)
    print("[OK] Created icon-512.png")

    maskable_192 = generate_png(192, 192, is_maskable=True)
    with open(os.path.join(PUBLIC_DIR, 'maskable-icon-192.png'), 'wb') as f:
        f.write(maskable_192)
    print("[OK] Created maskable-icon-192.png")

    maskable_512 = generate_png(512, 512, is_maskable=True)
    with open(os.path.join(PUBLIC_DIR, 'maskable-icon-512.png'), 'wb') as f:
        f.write(maskable_512)
    print("[OK] Created maskable-icon-512.png")

    ico_bytes = generate_ico(png_16, png_32)
    with open(os.path.join(PUBLIC_DIR, 'favicon.ico'), 'wb') as f:
        f.write(ico_bytes)
    print("[OK] Created favicon.ico")

    og_bytes = generate_og_image(1200, 630)
    with open(os.path.join(PUBLIC_DIR, 'og-image.png'), 'wb') as f:
        f.write(og_bytes)
    print("[OK] Created og-image.png")

if __name__ == '__main__':
    main()
