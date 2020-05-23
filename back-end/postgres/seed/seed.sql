-- Seed data with a fake user for testing

insert into users (name, email, joined) values ('a', 'a@a.com', '2018-01-01');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');
insert into garden_beds (user_id, bed_length, bed_width, left_position, top_position) values (1, 5, 5, 0, 0);
insert into gardens (user_id, garden_length, garden_width) values (1, 20, 20);