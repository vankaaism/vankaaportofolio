"""Generate hand-drawn stick-figure doodles (black ink + blue floor ellipse) for each project.
Usage: python3 -I doodles.py <out_dir>
"""
import math, os, sys

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

W, H = 480, 300
BG = "#F7F5F0"
BLUE = "#2348B0"
INK = "#151515"


def head(x, y, r=17, hair=None, look=0):
    s = f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff"/>'
    ex = x + look
    s += f'<circle cx="{ex-6}" cy="{y-2}" r="1.9" fill="{INK}" stroke="none"/><circle cx="{ex+6}" cy="{y-2}" r="1.9" fill="{INK}" stroke="none"/>'
    s += f'<path d="M{ex-5} {y+7} q5 4 10 0"/>'
    if hair == "spiky":
        s += "".join(f'<path d="M{x+dx} {y-r+2} l{dx*0.4:.1f} -11"/>' for dx in (-8, -3, 2, 7))
    elif hair == "curly":
        loops = "".join(f"a6 6 0 1 1 {8} 0 " for _ in range(4))
        s += f'<path d="M{x-r-2} {y-6} {loops}"/>'
        s += f'<path d="M{x-r+1} {y-14} a7 7 0 1 1 10 -6 a7 7 0 1 1 12 0 a6 6 0 1 1 10 6"/>'
    elif hair == "swoop":
        s += f'<path d="M{x-r+2} {y-8} q{r} -{r+6} {2*r} -2"/>'
    return s


def tie(x, y, ang=0):
    # flapping tie like the reference
    return (f'<path transform="rotate({ang} {x} {y})" d="M{x-4} {y} l8 0 l-2 6 l9 22 l-10 8 l-9 -9 l6 -21 z" '
            f'fill="{INK}"/>')


def limb(x, y, length, ang, bend=0.0):
    a = math.radians(ang)
    ex, ey = x + length * math.cos(a), y + length * math.sin(a)
    mx, my = (x + ex) / 2 - bend * math.sin(a), (y + ey) / 2 + bend * math.cos(a)
    return f'<path d="M{x:.1f} {y:.1f} Q{mx:.1f} {my:.1f} {ex:.1f} {ey:.1f}"/>', (ex, ey)


def figure(x, feet, arms=(150, 30), legs=(105, 75), hair=None, has_tie=True, tie_ang=0,
           look=0, body=62, arm_len=40, leg_len=52, bends=(8, -8)):
    hip = feet - leg_len * 0.95
    neck = hip - body
    hy = neck - 17
    s = head(x, hy, hair=hair, look=look)
    s += f'<path d="M{x} {neck} Q{x+2} {(neck+hip)/2} {x} {hip}"/>'
    sh = neck + 10
    l, _ = limb(x, sh, arm_len, arms[0], bends[0])
    r, _ = limb(x, sh, arm_len, arms[1], bends[1])
    s += l + r
    l, _ = limb(x, hip, leg_len, legs[0], 4)
    r, _ = limb(x, hip, leg_len, legs[1], -4)
    s += l + r
    if has_tie:
        s += tie(x, neck + 1, tie_ang)
    hands = (
        (x + arm_len * math.cos(math.radians(arms[0])), sh + arm_len * math.sin(math.radians(arms[0]))),
        (x + arm_len * math.cos(math.radians(arms[1])), sh + arm_len * math.sin(math.radians(arms[1]))),
    )
    return s, hands


def floor(cx=W / 2, cy=258, rx=170, ry=22):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{BLUE}" stroke="none"/>'


def svg(name, body, floor_args=None):
    fa = floor_args or {}
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*2}" height="{H*2}">
  <defs>
    <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/>
    </filter>
  </defs>
  <rect width="{W}" height="{H}" fill="{BG}"/>
  <g transform="translate(240 264) scale(1.12) translate(-240 -250)">
  {floor(**fa)}
  <g filter="url(#ink)" fill="none" stroke="{INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    {body}
  </g>
  </g>
</svg>'''
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(out)


# 1 ─ Temu: club matching. Two students meet over a "match" sign, third holds a ballot card.
a, _ = figure(170, 262, arms=(160, 25), hair="curly", tie_ang=-12, look=3)
b, hands_b = figure(250, 262, arms=(-60, 40), hair="spiky", tie_ang=10, look=-2)
hb = hands_b[0]
c, hands_c = figure(330, 262, arms=(150, -35), hair="swoop", tie_ang=18, look=-3)
hc = hands_c[1]
sign = (f'<path d="M{hb[0]:.0f} {hb[1]:.0f} L{hb[0]+4:.0f} {hb[1]-56:.0f}"/>'
        f'<rect x="{hb[0]-30:.0f}" y="{hb[1]-98:.0f}" width="72" height="44" rx="4" fill="#fff"/>'
        f'<path d="M{hb[0]-12:.0f} {hb[1]-78:.0f} l9 10 l18 -20" stroke-width="4"/>')
card = (f'<rect x="{hc[0]-8:.0f}" y="{hc[1]-30:.0f}" width="34" height="42" rx="3" fill="#fff" transform="rotate(-8 {hc[0]:.0f} {hc[1]:.0f})"/>'
        f'<path d="M{hc[0]-2:.0f} {hc[1]-18:.0f} h18 M{hc[0]-2:.0f} {hc[1]-8:.0f} h12 M{hc[0]-2:.0f} {hc[1]+2:.0f} h16" stroke-width="2.4"/>')
heart = '<path d="M205 118 c-6 -10 -20 -4 -14 6 l14 14 l14 -14 c6 -10 -8 -16 -14 -6 z" fill="#fff"/>'
svg("temu", a + b + c + sign + card + heart)

# 2 ─ Calibry: jogger with a watch next to a chart comparing two curves.
j, hj = figure(170, 262, arms=(200, -20), legs=(130, 50), hair="spiky", tie_ang=-35, look=4, bends=(-14, 12))
watch = f'<rect x="{hj[1][0]-6:.0f}" y="{hj[1][1]-6:.0f}" width="12" height="12" rx="3" fill="#fff"/>'
board = ('<rect x="250" y="70" width="150" height="110" rx="6" fill="#fff"/>'
         '<path d="M262 165 H388 M262 165 V82" stroke-width="2.6"/>'
         '<path d="M266 150 C290 140, 300 110, 322 115 S360 95, 384 92" />'
         '<path d="M266 156 C292 150, 304 128, 326 128 S362 112, 384 108" stroke-dasharray="7 7" stroke-width="2.6"/>'
         '<path d="M318 180 L310 250 M338 180 L346 250" stroke-width="3"/>')
kcal = '<text x="276" y="102" font-family="Comic Sans MS, Marker Felt, cursive" font-size="15" fill="#151515" stroke="none">kcal</text>'
speed = '<path d="M108 170 h-26 M114 190 h-34 M108 210 h-22" stroke-width="2.6"/>'
svg("calibry", j + watch + board + kcal + speed)

# 3 ─ LesTari: dancer with motion-capture markers, mirrored as a dotted skeleton on a laptop.
d, hd = figure(165, 262, arms=(-150, -35), legs=(115, 60), hair="curly", tie_ang=-20, look=-3, bends=(-10, 10))
markers = "".join(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="4.5" fill="{BLUE}" stroke="none"/>'
                  for x, y in [hd[0], hd[1], (165, 175), (165, 233), (150, 254), (190, 258)])
laptop = ('<path d="M290 150 h120 v82 h-120 z" fill="#fff"/><path d="M276 238 h148 l-10 10 h-128 z" fill="#fff"/>'
          '<g stroke-width="2.2" stroke-dasharray="1 7"><path d="M350 175 v30 M350 182 l-18 -14 M350 182 l18 -14 M350 205 l-12 20 M350 205 l10 20"/></g>'
          '<circle cx="350" cy="166" r="8" stroke-width="2.4"/>')
rays = '<path d="M215 150 q30 -6 60 4 M215 190 q30 0 60 2" stroke-dasharray="6 8" stroke-width="2.4"/>'
batik = '<path d="M120 92 q10 -12 20 0 t20 0 M128 80 q6 -8 12 0" stroke-width="2.4"/>'
svg("lestari", d + markers + laptop + rays)

# 4 ─ EEG matrices: figure wearing an EEG cap, wires to a board with a 2x2 matrix and a wave.
e, he = figure(175, 262, arms=(130, 20), hair=None, tie_ang=8, look=3)
cap = ('<path d="M157 120 q18 -26 36 0" stroke-width="3"/>'
       + "".join(f'<circle cx="{x}" cy="{y}" r="3.6" fill="{BLUE}" stroke="none"/>' for x, y in [(160, 116), (175, 106), (190, 116)]))
wires = '<path d="M175 104 C190 60, 240 60, 262 90 M190 114 C210 80, 240 100, 262 118" stroke-width="2.4"/>'
board = ('<rect x="262" y="66" width="150" height="120" rx="6" fill="#fff"/>'
         '<path d="M284 86 h-8 v52 h8 M352 86 h8 v52 h-8" stroke-width="3"/>'
         '<text x="290" y="108" font-family="Comic Sans MS, Marker Felt, cursive" font-size="17" fill="#151515" stroke="none">σ₁  ρ</text>'
         '<text x="290" y="132" font-family="Comic Sans MS, Marker Felt, cursive" font-size="17" fill="#151515" stroke="none">ρ   σ₂</text>'
         '<path d="M372 112 q6 -16 12 0 t12 0" stroke-width="2.4"/>'
         '<path d="M276 166 q8 -14 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0" stroke-width="2.4"/>'
         '<path d="M330 186 L322 252 M346 186 L354 252" stroke-width="3"/>')
svg("eeg", e + cap + wires + board)

# 5 ─ AI for regional languages: two people talking through a friendly robot translator.
p1, _ = figure(130, 262, arms=(150, 10), hair="swoop", tie_ang=-10, look=4)
p2, _ = figure(350, 262, arms=(170, 30), hair="spiky", tie_ang=12, look=-4)
robot = ('<rect x="214" y="156" width="52" height="44" rx="10" fill="#fff"/>'
         '<circle cx="230" cy="176" r="3" fill="#151515" stroke="none"/><circle cx="250" cy="176" r="3" fill="#151515" stroke="none"/>'
         '<path d="M232 188 h16 M240 156 v-12" stroke-width="2.6"/><circle cx="240" cy="140" r="4" fill="' + BLUE + '" stroke="none"/>'
         '<path d="M222 200 l-6 50 M258 200 l6 50 M214 170 l-16 14 M266 170 l16 14" />')
def bubble(x, y, w, text, tail):
    tx = x + (14 if tail == "l" else w - 14)
    return (f'<path d="M{x} {y} h{w} a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-{w} a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 z" fill="#fff"/>'
            f'<path d="M{tx} {y+38} l{-6 if tail == "l" else 6} 14 l{10 if tail == "l" else -10} -14" fill="#fff"/>'
            f'<text x="{x+6}" y="{y+25}" font-family="Comic Sans MS, Marker Felt, cursive" font-size="16" fill="#151515" stroke="none">{text}</text>')
talk = bubble(70, 52, 104, "Sampurasun", "l") + bubble(304, 52, 64, "Horas!", "r") + bubble(204, 88, 60, "Halo", "l")
svg("regional-languages", p1 + p2 + robot + talk)

# 6 ─ Essay: one calm figure sitting, faded dashed "past selves" walking away behind.
def ghost(x, op):
    g, _ = figure(x, 250, arms=(120, 60), hair="swoop", has_tie=False, look=2)
    return f'<g opacity="{op}" stroke-dasharray="5 7" stroke-width="2.6">{g}</g>'
ghosts = ghost(330, 0.45) + ghost(392, 0.28) + ghost(268, 0.6)
sit = ('<circle cx="170" cy="150" r="17" fill="#fff"/>'
       '<path d="M164 152 q3 -2 6 0 M176 152 q3 -2 6 0"/>'  # closed calm eyes
       '<path d="M166 160 q4 3 8 0"/>'
       '<path d="M170 167 Q172 195 170 222"/>'
       '<path d="M170 222 q-26 6 -40 24 q24 6 44 -2 M170 222 q26 6 40 24 q-24 6 -44 -2"/>'
       '<path d="M170 180 q-22 14 -30 34 M170 180 q22 14 30 34"/>'
       + tie(170, 168, 0))
pen = '<path d="M60 230 l40 -40 l8 8 l-40 40 z" fill="#fff"/><path d="M60 230 l-6 14 l14 -6" />'
leaves = '<path d="M110 90 q14 -18 28 0 q-14 10 -28 0 z M210 70 q12 -14 24 0 q-12 8 -24 0 z" fill="#fff" stroke-width="2.4"/>'
svg("essay", ghosts + sit + pen, floor_args={"cx": 180, "rx": 120})

print("done", sorted(os.listdir(OUT)))
