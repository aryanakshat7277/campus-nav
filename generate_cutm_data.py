import json
import os

nodes = [
    {"id": "MAIN_GATE", "name": "Main Gate", "lat": 18.7770, "lng": 84.0930, "floor": 0, "type": "entrance"},
    {"id": "ADMIN_BLOCK", "name": "Admin Block", "lat": 18.7778, "lng": 84.0935, "floor": 0, "type": "building"},
    {"id": "ARYABHATTA_GF", "name": "Aryabhatta Block", "lat": 18.7785, "lng": 84.0940, "floor": 0, "type": "building"},
    {"id": "AGRI_GF", "name": "School of Agriculture", "lat": 18.7795, "lng": 84.0950, "floor": 0, "type": "building"},
    {"id": "FISHERIES", "name": "School of Fisheries", "lat": 18.7800, "lng": 84.0945, "floor": 0, "type": "building"},
    {"id": "PHARMACY", "name": "School of Pharmacy", "lat": 18.7790, "lng": 84.0955, "floor": 0, "type": "building"},
    {"id": "MANAGEMENT", "name": "School of Management", "lat": 18.7782, "lng": 84.0945, "floor": 0, "type": "building"},
    {"id": "NURSING", "name": "School of Nursing", "lat": 18.7788, "lng": 84.0960, "floor": 0, "type": "building"},
    {"id": "CS_LAB", "name": "Computer Science Lab", "lat": 18.7786, "lng": 84.0942, "floor": 0, "type": "building"},
    {"id": "LIBRARY_GF", "name": "Central Library", "lat": 18.7780, "lng": 84.0940, "floor": 0, "type": "building"},
    {"id": "MAHANADI_HOSTEL", "name": "Mahanadi Boys Hostel", "lat": 18.7775, "lng": 84.0920, "floor": 0, "type": "building"},
    {"id": "NAGAVALI_HOSTEL", "name": "Nagavali Girls Hostel", "lat": 18.7790, "lng": 84.0920, "floor": 0, "type": "building"},
    {"id": "MAHENDRA_HOSTEL", "name": "Mahendra Tanaya Hostel", "lat": 18.7772, "lng": 84.0915, "floor": 0, "type": "building"},
    {"id": "INDRAVATI_HOSTEL", "name": "Indravati Hostel", "lat": 18.7792, "lng": 84.0915, "floor": 0, "type": "building"},
    {"id": "CENTRAL_MESS", "name": "Central Mess", "lat": 18.7777, "lng": 84.0925, "floor": 0, "type": "building"},
    {"id": "FOOD_COURT", "name": "Food Court", "lat": 18.7775, "lng": 84.0928, "floor": 0, "type": "building"},
    {"id": "AUDITORIUM", "name": "Auditorium", "lat": 18.7783, "lng": 84.0948, "floor": 0, "type": "building"},
    {"id": "TEMPLE", "name": "Campus Temple", "lat": 18.7780, "lng": 84.0932, "floor": 0, "type": "building"},
    {"id": "SPORTS_COMPLEX", "name": "Sports Complex", "lat": 18.7798, "lng": 84.0925, "floor": 0, "type": "building"},
    {"id": "MEDICAL", "name": "Diagnostics Center", "lat": 18.7776, "lng": 84.0942, "floor": 0, "type": "building"},
    {"id": "WELLNESS", "name": "Ayurveda Wellness Centre", "lat": 18.7774, "lng": 84.0944, "floor": 0, "type": "building"},
    {"id": "GUEST_HOUSE", "name": "Guest House", "lat": 18.7770, "lng": 84.0938, "floor": 0, "type": "building"},
    {"id": "ATM", "name": "ATM / Bank", "lat": 18.7773, "lng": 84.0933, "floor": 0, "type": "building"},
    {"id": "PARKING_AREA", "name": "Parking Area", "lat": 18.7772, "lng": 84.0932, "floor": 0, "type": "parking"},
    {"id": "MARKET", "name": "Market Complex", "lat": 18.7771, "lng": 84.0928, "floor": 0, "type": "building"},
    {"id": "STAFF_QUARTERS", "name": "Staff Quarters", "lat": 18.7768, "lng": 84.0920, "floor": 0, "type": "building"},
    {"id": "PRODUCTION_LAB", "name": "Production Labs", "lat": 18.7793, "lng": 84.0948, "floor": 0, "type": "building"},
    {"id": "APPLIED_SCIENCES", "name": "School of Applied Sciences", "lat": 18.7787, "lng": 84.0950, "floor": 0, "type": "building"},
    {"id": "VOCATIONAL_ED", "name": "School of Vocational Education", "lat": 18.7795, "lng": 84.0955, "floor": 0, "type": "building"},
    {"id": "CENTRAL_GARDEN", "name": "Central Garden", "lat": 18.7785, "lng": 84.0935, "floor": 0, "type": "garden"},
    # Indoor nodes
    {"id": "ARYABHATTA_1F", "name": "Aryabhatta Block 1F", "lat": 18.7785, "lng": 84.0940, "floor": 1, "type": "hallway"},
    {"id": "ARYABHATTA_2F", "name": "Aryabhatta Block 2F", "lat": 18.7785, "lng": 84.0940, "floor": 2, "type": "hallway"},
    {"id": "ARYABHATTA_1F_CLASS", "name": "Aryabhatta Class 101", "lat": 18.7785, "lng": 84.0941, "floor": 1, "type": "hallway"},
    {"id": "ARYABHATTA_2F_LAB", "name": "Aryabhatta CS Lab", "lat": 18.7785, "lng": 84.0941, "floor": 2, "type": "hallway"},
    {"id": "AGRI_1F", "name": "Agriculture 1F", "lat": 18.7795, "lng": 84.0950, "floor": 1, "type": "hallway"},
    {"id": "AGRI_1F_LAB", "name": "Agri Lab 101", "lat": 18.7795, "lng": 84.0951, "floor": 1, "type": "hallway"},
    {"id": "LIBRARY_READING", "name": "Reading Room", "lat": 18.7780, "lng": 84.0941, "floor": 0, "type": "hallway"},
    {"id": "ADMIN_REGISTRAR", "name": "Registrar Office", "lat": 18.7778, "lng": 84.0936, "floor": 0, "type": "hallway"},
    {"id": "MANAGEMENT_CLASS", "name": "MBA Classroom", "lat": 18.7782, "lng": 84.0946, "floor": 0, "type": "hallway"},
    # Intersections
    {"id": "INT_1", "name": "Gate Intersection", "lat": 18.7772, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_2", "name": "Food Court Intersection", "lat": 18.7775, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_3", "name": "Mess Intersection", "lat": 18.7778, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_4", "name": "Temple Intersection", "lat": 18.7780, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_5", "name": "Garden Intersection", "lat": 18.7785, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_6", "name": "North Hostels Intersection", "lat": 18.7790, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_7", "name": "South West Intersection", "lat": 18.7772, "lng": 84.0920, "floor": 0, "type": "intersection"},
    {"id": "INT_8", "name": "Mahanadi Intersection", "lat": 18.7775, "lng": 84.0925, "floor": 0, "type": "intersection"},
    {"id": "INT_9", "name": "Indravati Intersection", "lat": 18.7792, "lng": 84.0920, "floor": 0, "type": "intersection"},
    {"id": "INT_10", "name": "Sports Intersection", "lat": 18.7798, "lng": 84.0930, "floor": 0, "type": "intersection"},
    {"id": "INT_11", "name": "Medical Intersection", "lat": 18.7774, "lng": 84.0940, "floor": 0, "type": "intersection"},
    {"id": "INT_12", "name": "Library Intersection", "lat": 18.7778, "lng": 84.0938, "floor": 0, "type": "intersection"},
    {"id": "INT_13", "name": "Aryabhatta Intersection", "lat": 18.7785, "lng": 84.0943, "floor": 0, "type": "intersection"},
    {"id": "INT_14", "name": "Auditorium Intersection", "lat": 18.7782, "lng": 84.0948, "floor": 0, "type": "intersection"},
    {"id": "INT_15", "name": "Applied Sci Intersection", "lat": 18.7787, "lng": 84.0952, "floor": 0, "type": "intersection"},
    {"id": "INT_16", "name": "Agri Intersection", "lat": 18.7795, "lng": 84.0948, "floor": 0, "type": "intersection"},
    {"id": "INT_17", "name": "Staff Qtrs Intersection", "lat": 18.7768, "lng": 84.0925, "floor": 0, "type": "intersection"},
]

def calc_dist(n1, n2):
    return int(((n1['lat'] - n2['lat'])**2 + (n1['lng'] - n2['lng'])**2)**0.5 * 111000)

edges_base = [
    ("MAIN_GATE", "INT_1"),
    ("MARKET", "INT_1"),
    ("PARKING_AREA", "INT_1"),
    ("INT_1", "INT_2"),
    ("INT_1", "INT_7"),
    ("ATM", "INT_2"),
    ("FOOD_COURT", "INT_2"),
    ("INT_2", "INT_3"),
    ("INT_2", "INT_11"),
    ("INT_3", "CENTRAL_MESS"),
    ("INT_3", "ADMIN_BLOCK"),
    ("INT_3", "INT_4"),
    ("INT_4", "TEMPLE"),
    ("INT_4", "INT_5"),
    ("INT_5", "CENTRAL_GARDEN"),
    ("INT_5", "INT_6"),
    ("INT_6", "NAGAVALI_HOSTEL"),
    ("INT_6", "INT_9"),
    ("INT_6", "INT_10"),
    ("INT_7", "MAHENDRA_HOSTEL"),
    ("INT_7", "STAFF_QUARTERS"),
    ("INT_7", "INT_17"),
    ("INT_17", "INT_8"),
    ("INT_8", "MAHANADI_HOSTEL"),
    ("INT_8", "INT_3"),
    ("INT_9", "INDRAVATI_HOSTEL"),
    ("INT_10", "SPORTS_COMPLEX"),
    ("INT_11", "GUEST_HOUSE"),
    ("INT_11", "WELLNESS"),
    ("INT_11", "MEDICAL"),
    ("INT_11", "INT_12"),
    ("INT_12", "ADMIN_BLOCK"),
    ("INT_12", "LIBRARY_GF"),
    ("INT_12", "INT_13"),
    ("INT_13", "ARYABHATTA_GF"),
    ("INT_13", "CS_LAB"),
    ("INT_13", "INT_14"),
    ("INT_13", "INT_15"),
    ("INT_14", "MANAGEMENT"),
    ("INT_14", "AUDITORIUM"),
    ("INT_15", "APPLIED_SCIENCES"),
    ("INT_15", "PHARMACY"),
    ("INT_15", "NURSING"),
    ("INT_15", "VOCATIONAL_ED"),
    ("INT_15", "INT_16"),
    ("INT_16", "AGRI_GF"),
    ("INT_16", "PRODUCTION_LAB"),
    ("INT_16", "FISHERIES"),
]

edges = []
nodes_dict = {n['id']: n for n in nodes}
for s, t in edges_base:
    d = calc_dist(nodes_dict[s], nodes_dict[t])
    edges.append({"source": s, "target": t, "distance": d, "type": "walkway", "accessible": True, "outdoor": True})

# Add indoor edges
indoor_edges = [
    ("ARYABHATTA_GF", "ARYABHATTA_1F", "stairs", False),
    ("ARYABHATTA_GF", "ARYABHATTA_1F", "elevator", True),
    ("ARYABHATTA_1F", "ARYABHATTA_2F", "stairs", False),
    ("ARYABHATTA_1F", "ARYABHATTA_2F", "elevator", True),
    ("ARYABHATTA_1F", "ARYABHATTA_1F_CLASS", "corridor", True),
    ("ARYABHATTA_2F", "ARYABHATTA_2F_LAB", "corridor", True),
    ("AGRI_GF", "AGRI_1F", "stairs", False),
    ("AGRI_GF", "AGRI_1F", "elevator", True),
    ("AGRI_1F", "AGRI_1F_LAB", "corridor", True),
    ("LIBRARY_GF", "LIBRARY_READING", "corridor", True),
    ("ADMIN_BLOCK", "ADMIN_REGISTRAR", "corridor", True),
    ("MANAGEMENT", "MANAGEMENT_CLASS", "corridor", True),
]

for s, t, typ, acc in indoor_edges:
    d = calc_dist(nodes_dict[s], nodes_dict[t]) + 5
    edges.append({"source": s, "target": t, "distance": d, "type": typ, "accessible": acc, "outdoor": False})

graph_data = {"nodes": nodes, "edges": edges}

backend_path = r"backend\src\main\resources\data\campus_graph.json"
frontend_path = r"frontend\src\assets\data\campus_graph.json"
os.makedirs(os.path.dirname(frontend_path), exist_ok=True)
os.makedirs(os.path.dirname(backend_path), exist_ok=True)

with open(backend_path, "w") as f: json.dump(graph_data, f, indent=2)
with open(frontend_path, "w") as f: json.dump(graph_data, f, indent=2)

# Generate GeoJSON
features = []
offset = 0.00015
for n in nodes:
    if n['floor'] == 0 and n['type'] in ['building', 'parking', 'entrance', 'garden']:
        features.append({
            "type": "Feature",
            "properties": {"id": n["id"], "name": n["name"], "type": n["type"]},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [n["lng"]-offset, n["lat"]-offset],
                    [n["lng"]+offset, n["lat"]-offset],
                    [n["lng"]+offset, n["lat"]+offset],
                    [n["lng"]-offset, n["lat"]+offset],
                    [n["lng"]-offset, n["lat"]-offset]
                ]]
            }
        })
geojson = {"type": "FeatureCollection", "features": features}
with open(r"frontend\src\assets\data\campus_buildings.geojson", "w") as f: json.dump(geojson, f, indent=2)

# Generate SQL
sql = "-- Insert 35+ locations for CUTM\nINSERT INTO locations (id, name, category, building_id, floor, description, latitude, longitude, image_url, is_accessible, is_delivery, tags, opening_hours, created_at) VALUES \n"
sql_vals = []
for n in nodes:
    cat = n['type'] if n['type'] not in ['hallway', 'intersection'] else 'indoor'
    if 'CLASS' in n['id'] or 'LAB' in n['id']: cat = 'classroom/lab'
    if 'HOSTEL' in n['id']: cat = 'hostel'
    if 'MESS' in n['id'] or 'COURT' in n['id']: cat = 'canteen'
    sql_vals.append(f"('{n['id']}', '{n['name']}', '{cat}', null, {n['floor']}, '{n['name']} at CUTM', {n['lat']}, {n['lng']}, null, true, true, '{n['name'].lower().replace(' ', ',')}', '8:00 AM - 8:00 PM', CURRENT_TIMESTAMP)")

sql += ",\n".join(sql_vals) + ";\n\n"
sql += "-- Insert alerts\nINSERT INTO alerts (id, title, message, type, location_id, is_active, created_at) VALUES \n"
sql += "('ALERT_1', 'Main Gate Construction', 'Construction work at the main gate.', 'warning', 'MAIN_GATE', true, CURRENT_TIMESTAMP),\n"
sql += "('ALERT_2', 'Aryabhatta Elevator Maintenance', 'The elevator is closed for maintenance.', 'closure', 'ARYABHATTA_GF', true, CURRENT_TIMESTAMP),\n"
sql += "('ALERT_3', 'Extended Library Hours', 'The central library will remain open until midnight.', 'info', 'LIBRARY_GF', true, CURRENT_TIMESTAMP);\n"
with open(r"backend\src\main\resources\data.sql", "w") as f: f.write(sql)
