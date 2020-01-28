create database runrundb;
create schema runrun;

-- events table
CREATE TABLE runrun.events (
	id_event serial NOT NULL,
	event_name text NOT NULL,
	place text NOT NULL,
	event_date time NOT NULL,
	start_time date NOT NULL,
	id_organizer int4 null
);

-- organizers table
CREATE TABLE runrun.organizers (
	organizer_name varchar(100) NOT NULL,
	surname varchar(100) NOT NULL,
	email text NOT NULL,
	hash text NOT NULL,
	id_organizer int4 NOT NULL
);

CREATE TABLE runrun.participants (
	id_participant serial NOT NULL,
	participant_name varchar(100) NOT NULL,
	surname varchar(255) NOT NULL,
	dni varchar(10) NOT NULL,
	"number" int4 NOT null,
	email varchar(255) NOT NULL,
	gender varchar(15) NULL,
	birthdate date NOT NULL,
	id_tutor int4 NULL,
	relationship varchar(20) null,
	team varchar(100) NULL,
	delivered date NULL,
	taken_by varchar(255) NULL,
	number_type varchar(20) null,
	color varchar (20) not null
);


/* PK */
alter table events add constraint pk_events primary key (id_event);
alter table organizers add constraint pk_organizers primary key (id_organizer);
alter table participants add constraint pk_participants primary key (id_participant);

/* FK */
ALTER TABLE runrun.events ADD id_organizer int4 NOT NULL;
ALTER TABLE runrun.events ADD CONSTRAINT events_fk FOREIGN KEY (id_organizer) REFERENCES runrun.organizers(id_organizer);
ALTER TABLE runrun.participants ADD id_event int4 NOT NULL;
ALTER TABLE runrun.participants ADD CONSTRAINT participants_fk FOREIGN KEY (id_event) REFERENCES runrun.events(id_event);