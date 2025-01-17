
INSERT INTO department("name")VALUES('Computer Science');
INSERT INTO department("name")VALUES('Data Analyst');
INSERT INTO department("name")VALUES('Big Data');
INSERT INTO department("name")VALUES('Software');
INSERT INTO department("name")VALUES('Mobile');
INSERT INTO department("name")VALUES('Design');

INSERT INTO tag("name")VALUES('javascript');
INSERT INTO tag("name")VALUES('java');
INSERT INTO tag("name")VALUES('front-end');
INSERT INTO tag("name")VALUES('back-end');
INSERT INTO tag("name")VALUES('rest-api');
INSERT INTO tag("name")VALUES('python');
INSERT INTO tag("name")VALUES('security');
INSERT INTO tag("name")VALUES('ux-ui');
INSERT INTO tag("name")VALUES('web-development');
INSERT INTO tag("name")VALUES('react');
INSERT INTO tag("name")VALUES('spring-boot');

insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, department_id)
values ('faculty@miu.edu', 'faculty', 'faculty', '2021-11-27T11:52:01Z', '55 Declaration Road', 'Florida', 'Saint Petersburg', '33715', 3.9, 'faculty', false, 4);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, major_id)
values ('student@miu.edu', 'student', 'student', '2021-11-27T11:52:01Z', '55 Declaration Road', 'Florida', 'Saint Petersburg', '33715', 3.9, 'student', false, 3);


insert into person_tags (users_id, tags_id) values (1, 1);
insert into person_tags (users_id, tags_id) values (1, 2);
insert into person_tags (users_id, tags_id) values (1,3);

insert into person_tags (users_id, tags_id) values (2, 2);
insert into person_tags (users_id, tags_id) values (2, 4);
insert into person_tags (users_id, tags_id) values (2, 5);


insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('asauvain0@behance.net', 'Arlen', 'Sauvain', '2021-12-07T18:12:47Z', '0 Dorton Way', 'Pennsylvania', 'Pittsburgh', '15210', 2.1, 'student', false, 1, 1);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('snetley1@gizmodo.com', 'Seward', 'Netley', '2022-04-28T04:51:19Z', '64 Russell Point', 'Oregon', 'Portland', '97240', 3.7, 'student', false, 2, 1);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('jdillingham2@nature.com', 'Joy', 'Dillingham', '2022-02-14T02:39:16Z', '7 Twin Pines Way', 'Texas', 'San Antonio', '78230', 3.7, 'student', false, 3, 1);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('amenary3@wufoo.com', 'Abbey', 'Menary', '2021-11-28T17:56:34Z', '0 Artisan Alley', 'Virginia', 'Arlington', '22234', 3.2, 'student', false, 4, 1);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('kedlestone4@51.la', 'Kelci', 'Edlestone', '2022-05-28T05:44:47Z', '91407 Spaight Way', 'California', 'Escondido', '92030', 3.1, 'student', false, 5, 1);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('aquarles5@storify.com', 'Anne', 'Quarles', '2021-08-20T03:38:20Z', '13619 Maple Wood Way', 'Texas', 'Lubbock', '79415', 2.4, 'student', false, 6, 1);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('ptomowicz6@chron.com', 'Perri', 'Tomowicz', '2021-11-12T06:35:58Z', '2738 Swallow Hill', 'Texas', 'Gatesville', '76598', 3.1, 'student', false, 7, 2);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('skrysztofowicz7@sun.com', 'Stormy', 'Krysztofowicz', '2022-01-27T22:57:01Z', '0859 Montana Place', 'Oklahoma', 'Oklahoma City', '73157', 1.8, 'student', false, 8, 2);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('bheinschke8@fotki.com', 'Bard', 'Heinschke', '2022-06-25T09:41:33Z', '0308 Mallard Hill', 'Texas', 'Tyler', '75710', 3.4, 'student', false, 9, 2);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('carndell9@google.it', 'Carey', 'Arndell', '2021-08-18T03:26:22Z', '65 Roxbury Junction', 'Texas', 'Houston', '77255', 3.9, 'student', false, 10, 2);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('klafonda@dropbox.com', 'Keelby', 'Lafond', '2022-03-24T09:47:00Z', '81 Fremont Junction', 'Michigan', 'Detroit', '48232', 3.4, 'student', false, 11, 2);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('dlittleoverb@simplemachines.org', 'Drud', 'Littleover', '2022-05-04T21:40:02Z', '711 Canary Lane', 'West Virginia', 'Morgantown', '26505', 2.8, 'student', false, 12, 2);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('gmactrustamc@spotify.com', 'Gabriella', 'MacTrustam', '2022-08-03T09:45:37Z', '47 Sullivan Pass', 'California', 'San Francisco', '94169', 1.7, 'student', false, 13, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('ayarrowd@meetup.com', 'Augie', 'Yarrow', '2022-06-08T18:37:59Z', '42150 Onsgard Way', 'Indiana', 'Fort Wayne', '46862', 3.3, 'student', false, 14, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('ukitteringhame@state.gov', 'Urbano', 'Kitteringham', '2022-02-27T18:31:18Z', '73076 Northport Place', 'Texas', 'Longview', '75605', 2.8, 'student', false, 15, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('pmattinsonf@salon.com', 'Phedra', 'Mattinson', '2022-06-16T15:54:25Z', '8 Trailsway Court', 'California', 'Whittier', '90605', 3.7, 'student', false, 16, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('kdibbeg@ox.ac.uk', 'Kristan', 'Dibbe', '2022-04-16T08:13:23Z', '20469 Warner Road', 'Florida', 'Jacksonville', '32225', 2.9, 'student', false, 17, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('dbeardsdaleh@naver.com', 'Dacy', 'Beardsdale', '2022-07-06T07:30:15Z', '73385 Duke Park', 'District of Columbia', 'Washington', '20057', 2.5, 'student', false, 18, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('wisoldii@wikia.com', 'Westleigh', 'Isoldi', '2022-01-18T00:12:53Z', '8 Haas Street', 'South Carolina', 'Columbia', '29220', 2.5, 'student', false, 19, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('dbernardtj@ow.ly', 'Dewey', 'Bernardt', '2021-10-17T00:18:43Z', '8 Jenifer Court', 'Arizona', 'Tempe', '85284', 2.4, 'student', false, 20, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('lryderk@washingtonpost.com', 'Luis', 'Ryder', '2022-01-14T03:02:57Z', '45 Mccormick Circle', 'California', 'Sacramento', '94291', 2.4, 'student', false, 21, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('rgregsl@cargocollective.com', 'Riva', 'Gregs', '2022-05-31T03:28:04Z', '688 Anniversary Place', 'Florida', 'Orlando', '32891', 3.1, 'student', false, 22, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('sperriem@cnbc.com', 'Sebastian', 'Perrie', '2022-01-28T07:15:46Z', '62 Gale Plaza', 'Colorado', 'Denver', '80241', 3.7, 'student', false, 23, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('kscottinin@vimeo.com', 'Kennith', 'Scottini', '2022-06-14T15:15:22Z', '7 Mallory Place', 'Indiana', 'Jeffersonville', '47134', 2.1, 'student', false, 24, 3);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('lpaullino@nytimes.com', 'Leslie', 'Paullin', '2021-10-29T08:39:30Z', '18524 Monterey Hill', 'Georgia', 'Atlanta', '30306', 3.1, 'student', false, 25, 4);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('ejentp@foxnews.com', 'Ellen', 'Jent', '2022-07-08T08:35:46Z', '58 Carpenter Court', 'Louisiana', 'New Orleans', '70154', 3.4, 'student', false, 26, 4);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('rtiftq@mozilla.com', 'Rebecca', 'Tift', '2022-03-15T15:34:03Z', '7 Acker Crossing', 'Texas', 'Odessa', '79764', 3.1, 'student', false, 27, 4);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('nnabbsr@joomla.org', 'Netti', 'Nabbs', '2021-10-22T05:21:08Z', '09 Michigan Place', 'New York', 'Jamaica', '11436', 3.3, 'student', false, 28, 4);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('jfranchyonoks@tinypic.com', 'Jacquelyn', 'Franchyonok', '2021-09-30T13:53:29Z', '3 Susan Point', 'District of Columbia', 'Washington', '20036', 1.0, 'student', false, 29, 4);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('ccokelyt@meetup.com', 'Catlaina', 'Cokely', '2022-04-28T05:38:40Z', '667 Stang Street', 'Alaska', 'Anchorage', '99512', 3.1, 'student', false, 30, 5);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('lbensleyu@vkontakte.ru', 'Leola', 'Bensley', '2022-04-15T23:26:20Z', '7244 Jenna Lane', 'New York', 'Brooklyn', '11236', 2.9, 'student', false, 31, 5);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('sloitertonv@hp.com', 'Simone', 'Loiterton', '2022-08-07T16:19:02Z', '45 Mosinee Terrace', 'Nevada', 'Las Vegas', '89150', 3.2, 'student', false, 32, 5);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('abeadhamw@hud.gov', 'Annabel', 'Beadham', '2022-04-17T11:51:38Z', '8530 Melby Hill', 'District of Columbia', 'Washington', '20404', 3.2, 'student', false, 33, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('nlezemerex@typepad.com', 'Nadya', 'Lezemere', '2022-04-14T22:11:00Z', '2 Logan Lane', 'Texas', 'Midland', '79705', 3.3, 'student', false, 34, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('pmerrigansy@printfriendly.com', 'Pammi', 'Merrigans', '2021-08-09T00:07:07Z', '48 Sunbrook Hill', 'Hawaii', 'Honolulu', '96815', 2.0, 'student', false, 35, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('pnayerz@bing.com', 'Patten', 'Nayer', '2022-02-22T17:42:06Z', '30795 Dayton Lane', 'Connecticut', 'Hartford', '06145', 2.0, 'student', false, 36, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('bdiable10@adobe.com', 'Brande', 'Diable', '2022-06-12T03:38:59Z', '3893 Mifflin Road', 'California', 'Anaheim', '92805', 1.8, 'student', false, 37, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('lmudd11@japanpost.jp', 'Leta', 'Mudd', '2021-11-10T21:34:18Z', '25 Melvin Trail', 'West Virginia', 'Charleston', '25326', 2.8, 'student', false, 38, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('bradleigh12@yandex.ru', 'Bunnie', 'Radleigh', '2021-09-20T01:09:04Z', '13163 Colorado Parkway', 'North Carolina', 'Greensboro', '27409', 3.2, 'student', false, 39, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('nmacmenemy13@dagondesign.com', 'Nobe', 'MacMenemy', '2022-07-17T11:03:05Z', '698 Banding Park', 'Alabama', 'Birmingham', '35231', 1.9, 'student', false, 40, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('glamplough14@reddit.com', 'Gerhardine', 'Lamplough', '2021-11-07T13:35:15Z', '1 Surrey Center', 'Louisiana', 'New Orleans', '70154', 2.1, 'student', false, 41, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('emortel15@fema.gov', 'Eddie', 'Mortel', '2022-05-06T04:56:07Z', '0 Talisman Parkway', 'New York', 'Albany', '12205', 1.7, 'student', false, 42, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('sfulep16@edublogs.org', 'Stefano', 'Fulep', '2022-07-14T23:11:56Z', '9 Nancy Plaza', 'Ohio', 'Cincinnati', '45238', 2.7, 'student', false, 43, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('rmatas17@marketwatch.com', 'Rozelle', 'Matas', '2022-04-03T19:46:50Z', '44466 Carpenter Lane', 'California', 'San Jose', '95194', 3.1, 'student', false, 44, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('vdacre18@purevolume.com', 'Vittorio', 'Dacre', '2021-08-31T05:30:16Z', '55 Vernon Alley', 'Kansas', 'Wichita', '67260', 2.8, 'student', false, 45, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('isimnor19@alibaba.com', 'Ignazio', 'Simnor', '2021-09-04T23:55:56Z', '0191 Russell Pass', 'Texas', 'El Paso', '88558', 2.3, 'student', false, 46, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('teberst1a@dedecms.com', 'Tod', 'Eberst', '2021-10-21T07:47:44Z', '1 Fairview Place', 'Virginia', 'Vienna', '22184', 1.6, 'student', false, 47, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('mhymus1b@acquirethisname.com', 'Merridie', 'Hymus', '2022-05-10T11:57:17Z', '5 Little Fleur Hill', 'California', 'San Francisco', '94121', 3.3, 'student', false, 48, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('bpeaddie1c@bloomberg.com', 'Berty', 'Peaddie', '2022-01-18T06:58:41Z', '8736 Burning Wood Place', 'Montana', 'Billings', '59112', 2.8, 'student', false, 49, 6);
insert into person (email, first_name, lastname, last_logged_in_at, address, state, city, zip_code, gpa, type, is_deleted, user_id, major_id) values ('lblackley1d@qq.com', 'Libbie', 'Blackley', '2021-11-27T11:52:01Z', '55 Declaration Road', 'Florida', 'Saint Petersburg', '33715', 3.9, 'student', false, 50, 6);

INSERT INTO comment("content", "created_by", "created_date", "student_id")VALUES('Good student', 'faculty', '2021-12-07T18:12:47Z', 1);
INSERT INTO comment("content", "created_by", "created_date", "student_id")VALUES('Late student', 'faculty', '2021-12-07T18:12:47Z', 2);
INSERT INTO comment("content", "created_by", "created_date", "student_id")VALUES('Excellent student', 'faculty', '2021-12-07T18:12:47Z', 3);
INSERT INTO comment("content", "created_by", "created_date", "student_id")VALUES('Good student', 'faculty', '2021-12-07T18:12:47Z', 4);
INSERT INTO comment("content", "created_by", "created_date", "student_id")VALUES('Hard working student', 'faculty', '2021-12-07T18:12:47Z', 5);

INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('student','Facebook', 'California','San Francisco','High Salary', 'Senior UX Developer, Web Experience at Indeed Senior UX Developers, Web Experience at Indeed serve a critical role in getting designs into production, bridging the design and engineering organizations. Senior UX Developers work with a cross-functional team to build accessible user interfaces for our products; create fast, scalable, maintainable, and secure systems; define best practices in UI development; and contribute to design ideation and decision making', '2022-07-09 17:22:49.828', 184000, 'Senior UX Developer, Web Experience');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('student','Deers', 'Iowa','Fairfield','Dental Insurance', 'We are seeking an energetic, Software Developer, with 3-5 years under their belt, to join our growing team of software developers, helping to drive innovation in the Architecture Engineering and Construction (AEC) Industry. We work with a wide range of technologies and APIs to help our customers achieve productivity enhancements and increase their return on investment in Autodesk software products', '2022-07-09 16:22:49.828', 105000, 'Full Stack Developer ReactJS/.NETCore Autodesk Forge + BIM360');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('admin','Apple', 'Texas','Austin','Paid time off', 'UX Developers, Employer at Indeed serve a critical role evolving concepts and designs into production for the Indeed Employer website experience. They specialize in bridging the gap between design and engineering, executing and advocating high-quality UX standards and best practices.', '2022-07-09 15:22:49.828', 159000, 'UX Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('admin','Amazon', 'Texas','Remote','401k', 'Opportunity for an Android Developer to join a rapidly growing healthcare company focused on leveraging information technology to aid in population health and improving health outcomes.The Android app developer will work with our team of talented engineers to design and build the next generation of our mobile applications. Android programming works closely with other app development and technical teams.', '2022-07-09 14:22:49.828', 70000, 'Android Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('admin','Amgen', 'Florida','Tampa','Flexible Schedule', 'U.S. citizenship required (defined by federal contract): Required Education: Bachelor’s in Computer Science, Computer Engineering, Mathematics, Physics or related field or possess relevant experience in lieu of education Preferred Education: Master’s or PhD in Computer Science, Computer Engineering, Mathematics, Physics or related field', '2022-07-09 13:22:49.828', 120000, 'Software Engineer - Front End');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('admin','IDT Corporation', 'California','San Francisco','Relocation assistance', 'Our client is one of the world’s leading digital performance-based marketing companies, dedicated to providing superior results for our advertisers and media partners. They accomplish this by combining best-in-class expertise in media optimization and targeting with our in-house analytics and big-data technology. Our client has a strong analytical focus that requires quick reaction in this fast-paced environment. Our success is fueled by employee innovation, data driven decisions and a startup mentality. Our teams are comprised of Software Engineers, Web Developers, Media Buyers, Account Managers and Business Intelligence Analysts. This position is available in their Fort Myers office right across from GCTC. Employees enjoy free lunches, free benefits, unlimited time off, no dress code and company team building trips.', '2022-07-09 12:22:49.828', 130000, 'Senior Android Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('admin','T-Mobile', 'Washington','Seattle','Employee assistance program', 'Multi-unit business operators often find accounting and payroll to be frustrating and expensive. InfoSync provides the people and technology so they can focus on their core business.With over 10,000 locations using our services across 80 different brands, InfoSync is the leading provider of outsourcing services for multi-unit businesses.', '2022-07-09 11:22:49.828', 110000, 'Senior Application Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('admin','Spotify', 'New Jersey','New Ark','Health Insurance', 'Responsibilities of a Full Stack Developer:Use different front-end Technologies to build interactive User Interfaces.Should be able to design robust backend architecture using different technologies to retrieve data from the servers.Creating databases and servers that are resistant to outages and work endlessly.Ensuring cross-platform compatibility by creating applications that work on different platforms.Based on the type of application the developer is responsible for the creation of API.The developer is responsible for building flexible applications that meet consumer requirements.', '2022-07-09 10:22:49.828', 159205, 'Java Full Stack Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('faculty','Square', 'California','Los Angeles','Life Insurance', 'Responsibilities of a Full Stack Developer:Use different front-end Technologies to build interactive User Interfaces.Should be able to design robust backend architecture using different technologies to retrieve data from the servers.Creating databases and servers that are resistant to outages and work endlessly.Ensuring cross-platform compatibility by creating applications that work on different platforms.Based on the type of application the developer is responsible for the creation of API.The developer is responsible for building flexible applications that meet consumer requirements.', '2022-07-09 09:22:49.828', 133000, 'Python Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('faculty','Vivo', 'Colorado','Goodfield','', 'GetUWired’s junior web developers work with our project managers and other developers to update, maintain and craft custom websites. They also implement marketing strategies associated with membership sites, newsletter signups, and various CRM platforms. This position uses both frontend and backend technologies…', '2022-07-08 16:22:49.828', 115000, 'Junior Web Developer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('faculty','IBM', 'Texas','Austin','401k', 'Traject Data powers business insights for many household internet brands and trendsetters in the digital marketing space. We’re looking to add a backend engineer to our team. This is the perfect opportunity for you if you are passionate about building solutions with modern cloud and data technologies and are interested in working in the digital marketing | SEO space. The ideal candidate is a capable backend engineer that can demonstrate prior experience building and scaling cloud-native data-centric applications specifically using Node.js, AWS and MYSQL.', '2022-07-08 17:22:49.828', 140000, 'Backend Engineer');
INSERT INTO job_advertisement(created_by, company, state, city, benefit, description, posted, salary, title)
VALUES('faculty','Woongjin Inc', 'New Jersey','Ridgefield Park','401k', 'Signify Technology is partnered with a client who is seeking a Frontend Software Developer to join their team! Successful candidates will have the ability to make an immediate impact in delivering highly scalable solutions as our client continues to expand their userbase and service offerings.', '2022-07-08 18:22:49.828', 200000, 'Frontend Developer');


INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(1,1);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(1,3);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(2,1);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(2,5);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(2,8);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(2,4);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(2,2);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(3,1);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(3,3);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(3,8);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(3,10);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(4,2);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(4,5);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(4,6);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(5,1);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(5,2);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(6,3);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(6,4);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(7,5);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(7,6);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(8,7);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(9,8);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(9,9);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(9,10);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(10,1);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(11,2);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(11,6);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(12,1);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(12,2);
INSERT INTO job_advertisement_tags(advertisements_id, tags_id)VALUES(12,3);

