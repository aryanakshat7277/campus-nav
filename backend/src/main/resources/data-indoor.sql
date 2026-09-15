INSERT INTO buildings (id, name, code, description, latitude, longitude, total_floors, has_elevator, has_ramp, image_url, is_accessible, category, status, created_at)
VALUES ('ARYABHATTA_BUILDING', 'Aryabhatta Block', 'ARY', 'Main Academic Building', 18.7785, 84.0940, 3, true, true, '/images/aryabhatta.jpg', true, 'Academic', 'active', CURRENT_TIMESTAMP);

INSERT INTO floors (id, building_id, floor_number, name, floor_plan_url, height_meters, is_accessible, status) VALUES
('ARYABHATTA_FLOOR_0', 'ARYABHATTA_BUILDING', 0, 'Ground Floor', '/maps/ary_f0.png', 4.0, true, 'active'),
('ARYABHATTA_FLOOR_1', 'ARYABHATTA_BUILDING', 1, 'First Floor', '/maps/ary_f1.png', 4.0, true, 'active'),
('ARYABHATTA_FLOOR_2', 'ARYABHATTA_BUILDING', 2, 'Second Floor', '/maps/ary_f2.png', 4.0, true, 'active');

INSERT INTO rooms (id, floor_id, building_id, room_number, name, category, description, local_x, local_y, latitude, longitude, is_accessible, capacity, opening_hours, status) VALUES
('ROOM_A001', 'ARYABHATTA_FLOOR_0', 'ARYABHATTA_BUILDING', 'A001', 'Chemistry Lab', 'Lab', 'Ground floor chemistry lab', 10.0, 20.0, 18.77851, 84.09401, true, 40, '08:00-17:00', 'active'),
('ROOM_A002', 'ARYABHATTA_FLOOR_0', 'ARYABHATTA_BUILDING', 'A002', 'Physics Lab', 'Lab', 'Ground floor physics lab', 20.0, 20.0, 18.77852, 84.09402, true, 40, '08:00-17:00', 'active'),
('ROOM_A101', 'ARYABHATTA_FLOOR_1', 'ARYABHATTA_BUILDING', 'A101', 'Classroom 101', 'Classroom', 'First floor classroom', 10.0, 20.0, 18.77851, 84.09401, true, 60, '08:00-17:00', 'active'),
('ROOM_A102', 'ARYABHATTA_FLOOR_1', 'ARYABHATTA_BUILDING', 'A102', 'Classroom 102', 'Classroom', 'First floor classroom', 20.0, 20.0, 18.77852, 84.09402, true, 60, '08:00-17:00', 'active'),
('ROOM_A201', 'ARYABHATTA_FLOOR_2', 'ARYABHATTA_BUILDING', 'A201', 'Computer Lab 1', 'Lab', 'Second floor computer lab', 10.0, 20.0, 18.77851, 84.09401, true, 50, '08:00-17:00', 'active'),
('ROOM_A202', 'ARYABHATTA_FLOOR_2', 'ARYABHATTA_BUILDING', 'A202', 'Computer Lab 2', 'Lab', 'Second floor computer lab', 20.0, 20.0, 18.77852, 84.09402, true, 50, '08:00-17:00', 'active'),
('ROOM_A203', 'ARYABHATTA_FLOOR_2', 'ARYABHATTA_BUILDING', 'A203', 'Server Room', 'Facility', 'Main server room', 30.0, 20.0, 18.77853, 84.09403, true, 5, '24/7', 'active'),
('ROOM_A103', 'ARYABHATTA_FLOOR_1', 'ARYABHATTA_BUILDING', 'A103', 'Faculty Lounge', 'Office', 'Faculty break room', 30.0, 20.0, 18.77853, 84.09403, true, 20, '08:00-18:00', 'active');

INSERT INTO navigation_nodes (id, building_id, floor_id, name, node_type, local_x, local_y, latitude, longitude, floor, is_accessible, is_indoor, metadata) VALUES
('NODE_E0', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'Main Entrance', 'entrance', 0.0, 15.0, 18.77850, 84.09400, 0, true, true, '{}'),
('NODE_C0_1', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'GF Corridor 1', 'corridor', 10.0, 15.0, 18.77851, 84.09401, 0, true, true, '{}'),
('NODE_C0_2', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'GF Corridor 2', 'corridor', 20.0, 15.0, 18.77852, 84.09402, 0, true, true, '{}'),
('NODE_S0', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'GF Stairs', 'staircase', 25.0, 15.0, 18.778525, 84.094025, 0, false, true, '{}'),
('NODE_EL0', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'GF Elevator', 'elevator', 30.0, 15.0, 18.77853, 84.09403, 0, true, true, '{}'),

('NODE_C1_1', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'FF Corridor 1', 'corridor', 10.0, 15.0, 18.77851, 84.09401, 1, true, true, '{}'),
('NODE_C1_2', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'FF Corridor 2', 'corridor', 20.0, 15.0, 18.77852, 84.09402, 1, true, true, '{}'),
('NODE_S1', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'FF Stairs', 'staircase', 25.0, 15.0, 18.778525, 84.094025, 1, false, true, '{}'),
('NODE_EL1', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'FF Elevator', 'elevator', 30.0, 15.0, 18.77853, 84.09403, 1, true, true, '{}'),
('NODE_C1_3', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'FF Corridor 3', 'corridor', 30.0, 25.0, 18.77854, 84.09404, 1, true, true, '{}'),

('NODE_C2_1', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'SF Corridor 1', 'corridor', 10.0, 15.0, 18.77851, 84.09401, 2, true, true, '{}'),
('NODE_C2_2', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'SF Corridor 2', 'corridor', 20.0, 15.0, 18.77852, 84.09402, 2, true, true, '{}'),
('NODE_S2', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'SF Stairs', 'staircase', 25.0, 15.0, 18.778525, 84.094025, 2, false, true, '{}'),
('NODE_EL2', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'SF Elevator', 'elevator', 30.0, 15.0, 18.77853, 84.09403, 2, true, true, '{}'),
('NODE_C2_3', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'SF Corridor 3', 'corridor', 30.0, 25.0, 18.77854, 84.09404, 2, true, true, '{}');

INSERT INTO navigation_edges (id, source_node_id, target_node_id, distance, walking_time, edge_type, is_accessible, stairs_required, elevator_required, is_restricted, is_blocked, block_reason, bidirectional) VALUES
('EDGE_1', 'NODE_E0', 'NODE_C0_1', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_2', 'NODE_C0_1', 'NODE_C0_2', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_3', 'NODE_C0_2', 'NODE_S0', 5.0, 5.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_4', 'NODE_C0_2', 'NODE_EL0', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),

('EDGE_5', 'NODE_S0', 'NODE_S1', 15.0, 30.0, 'stairs', false, true, false, false, false, NULL, true),
('EDGE_6', 'NODE_EL0', 'NODE_EL1', 10.0, 15.0, 'elevator', true, false, true, false, false, NULL, true),

('EDGE_7', 'NODE_C1_1', 'NODE_C1_2', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_8', 'NODE_C1_2', 'NODE_S1', 5.0, 5.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_9', 'NODE_C1_2', 'NODE_EL1', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_10', 'NODE_EL1', 'NODE_C1_3', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),

('EDGE_11', 'NODE_S1', 'NODE_S2', 15.0, 30.0, 'stairs', false, true, false, false, false, NULL, true),
('EDGE_12', 'NODE_EL1', 'NODE_EL2', 10.0, 15.0, 'elevator', true, false, true, false, false, NULL, true),

('EDGE_13', 'NODE_C2_1', 'NODE_C2_2', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_14', 'NODE_C2_2', 'NODE_S2', 5.0, 5.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_15', 'NODE_C2_2', 'NODE_EL2', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true),
('EDGE_16', 'NODE_EL2', 'NODE_C2_3', 10.0, 10.0, 'corridor', true, false, false, false, false, NULL, true);

INSERT INTO beacons (id, beacon_uuid, major, minor, building_id, floor_id, node_id, local_x, local_y, latitude, longitude, installation_height, signal_calibration, status, last_seen, created_at) VALUES
('BEACON_1', 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', 1, 1, 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_E0', 0.0, 15.0, 18.77850, 84.09400, 2.5, -59, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BEACON_2', 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', 1, 2, 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_EL0', 30.0, 15.0, 18.77853, 84.09403, 2.5, -59, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BEACON_3', 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', 2, 1, 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'NODE_C1_1', 10.0, 15.0, 18.77851, 84.09401, 2.5, -59, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BEACON_4', 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', 2, 2, 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'NODE_EL1', 30.0, 15.0, 18.77853, 84.09403, 2.5, -59, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BEACON_5', 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', 3, 1, 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'NODE_C2_1', 10.0, 15.0, 18.77851, 84.09401, 2.5, -59, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BEACON_6', 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', 3, 2, 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'NODE_EL2', 30.0, 15.0, 18.77853, 84.09403, 2.5, -59, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO navigation_qrs (id, qr_code, building_id, floor_id, node_id, local_x, local_y, latitude, longitude, description, is_active, created_at) VALUES
('QR_1', 'qr_token_entrance', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_E0', 0.0, 15.0, 18.77850, 84.09400, 'Main Entrance QR', true, CURRENT_TIMESTAMP),
('QR_2', 'qr_token_gf_elevator', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_EL0', 30.0, 15.0, 18.77853, 84.09403, 'GF Elevator QR', true, CURRENT_TIMESTAMP),
('QR_3', 'qr_token_ff_stairs', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'NODE_S1', 25.0, 15.0, 18.778525, 84.094025, 'FF Stairs QR', true, CURRENT_TIMESTAMP),
('QR_4', 'qr_token_sf_elevator', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'NODE_EL2', 30.0, 15.0, 18.77853, 84.09403, 'SF Elevator QR', true, CURRENT_TIMESTAMP);

INSERT INTO landmarks (id, name, description, category, building_id, floor_id, node_id, local_x, local_y, latitude, longitude, image_url, is_indoor, created_at) VALUES
('LM_1', 'Main Sign', 'Aryabhatta Block Main Sign', 'signage', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_E0', 0.0, 15.0, 18.77850, 84.09400, '/images/lm_mainsign.jpg', true, CURRENT_TIMESTAMP),
('LM_2', 'GF Notice Board', 'Ground Floor Main Notice Board', 'notice_board', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_C0_1', 10.0, 15.0, 18.77851, 84.09401, '/images/lm_notice0.jpg', true, CURRENT_TIMESTAMP),
('LM_3', 'FF Water Cooler', 'First Floor Water Cooler', 'utility', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_1', 'NODE_C1_1', 10.0, 15.0, 18.77851, 84.09401, NULL, true, CURRENT_TIMESTAMP),
('LM_4', 'SF Notice Board', 'Second Floor Notice Board', 'notice_board', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_2', 'NODE_C2_1', 10.0, 15.0, 18.77851, 84.09401, '/images/lm_notice2.jpg', true, CURRENT_TIMESTAMP),
('LM_5', 'Central Elevator', 'Main Glass Elevator', 'elevator', 'ARYABHATTA_BUILDING', 'ARYABHATTA_FLOOR_0', 'NODE_EL0', 30.0, 15.0, 18.77853, 84.09403, '/images/lm_elevator.jpg', true, CURRENT_TIMESTAMP);

INSERT INTO accessibility_profiles (id, name, avoid_stairs, prefer_elevators, prefer_ramps, wheelchair_required, max_gradient, extra_time_factor) VALUES
('PROFILE_WHEELCHAIR', 'Wheelchair', true, true, true, true, 5.0, 1.5);
