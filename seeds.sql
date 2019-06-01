DELETE "shopcategory";
INSERT INTO "shopcategory" ("name", "deleted", "created_at", "updated_at") VALUES ('Français', 0, current_date, current_date);
INSERT INTO "shopcategory" ("name", "deleted", "created_at", "updated_at") VALUES ('Italien', 0, current_date, current_date);
INSERT INTO "shopcategory" ("name", "deleted", "created_at", "updated_at") VALUES ('Japonais', 0, current_date, current_date);
INSERT INTO "shopcategory" ("name", "deleted", "created_at", "updated_at") VALUES ('Chinois', 0, current_date, current_date);
INSERT INTO "shopcategory" ("name", "deleted", "created_at", "updated_at") VALUES ('Bio', 0, current_date, current_date);
INSERT INTO "shopcategory" ("name", "deleted", "created_at", "updated_at") VALUES ('Végan', 0, current_date, current_date);

DELETE "user";
INSERT INTO "user" ("id","firstname","lastname","phone_number","email","password","role","deleted","created_at","updated_at") 
VALUES (1,'nathan','lebreton','0678451278','a@a.fr','password','CUSTOMER',0,current_date,current_date);

DELETE "customer";
INSERT INTO "customer" ("id","deleted","created_at","updated_at")
VALUES (1,0,current_date,current_date);
/*
DELETE "shop";
INSERT INTO shop ("name", "address", "city", "postal_code", "siret", "siren", "phone_number", "email", "location", "deleted", "created_at", "updated_at") VALUES ("Les grands gamins", "12 allée des gamins", "Rennes", "35000", "12345678912345", "123456789", "0678895645", "a@a.com", ST_GeomFromText("POINT(1 1)"), 0, current_date, current_date);

DELETE "product";
*/