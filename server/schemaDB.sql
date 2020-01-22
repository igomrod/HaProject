create database runrundb;
create schema runrun;

-- events table
CREATE TABLE runrun.events (
    id_event serial NOT NULL,
    event_name text NOT NULL,
    place text NOT NULL,
    event_date TIME NOT NULL,
    start_time DATE NOT NULL,
    id_organizer int4 NOT NULL
);

-- events_participants table (needed because events and participants have an n-m relationship)
CREATE TABLE runrun.events_participants (
    id_event serial NOT NULL,
    id_participant serial NOT NULL
);

-- organizers table
CREATE TABLE runrun.organizers (
    organizer_name varchar(100) NOT NULL,
    surname varchar(100) NOT NULL,
    email text NOT NULL,
    hash text NOT NULL,
    id_organizer int4 NOT NULL
);


-- participants table
CREATE TABLE runrun.participants (
    id_participant serial NOT NULL,
    participant_name varchar(100) NOT NULL,
    surname varchar(255) NOT NULL,
    dni varchar (10) NOT NULL,
    "number" int4 NOT NULL,
    email varchar(255) NOT ULL,
    gender varchar(15) NULL,
    birthdate date NOT NULL,
    team varchar(100) NOT NULL,
    id_tutor int4 NOT NULL
    id_team int4 NULL,
    delivered date NULL,
    taken_by varchar(255) NULL,
    number_type varchar(20) NULL,
);

-- teams table
CREATE TABLE runrun.teams (
    id_team int4 NOT NULL,
    team_name varchar(100) NOT NULL,
    CONSTRAINT pk_teamsPRIMARY KEY (id_team)
);

-- tutors table
CREATE TABLE runrun.tutors (
    id_tutor serial NOT NULL,
    tutor_name varchar(100) NOT NULL,
    surname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    dni varchar(10) NOT NULL,
    relationship varchar(100) NOT NULL
);

/* PK */
alter table events add constraint pk_events primary key (id_event);
alter table events_participants add constraint pk_events_participants primary key (id_event, id_participant);
alter table organizers add constraint pk_organizers primary key (id_organizer);
alter table participants add constraint pk_participants primary key (id_participant);
alter table teams add constraint pk_teams primary key (id_team);
alter table tutors add constraint pk_tutors primary key (id_tutor);

/* FK */
alter table events_participants add constraint fk_events_participants_participants foreign key(id_participant) references participants (id_participant);
alter table events_participants add constraint fk_events_participants_events foreign key(id_event) references events (id_event);
alter table participants add constraint fk_participants_tutors foreign key(id_tutor) references tutors (id_tutor);
alter table participants add constraint fk_events_participants_teams foreign key(id_team) references teams (id_team);
alter table eventss add constraint fk_events_organizers foreign key(id_organizer) references organizers (id_organizer);


