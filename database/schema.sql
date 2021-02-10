set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"role" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dailyAttendees" (
	"attendeeId" serial NOT NULL,
	"userId" integer NOT NULL,
	"date" DATE NOT NULL,
	CONSTRAINT "dailyAttendees_pk" PRIMARY KEY ("attendeeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stayAtHome" (
	"stayHomeId" serial NOT NULL,
	"userId" integer NOT NULL,
	"returnDate" DATE NOT NULL,
	CONSTRAINT "stayAtHome_pk" PRIMARY KEY ("stayHomeId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "dailyAttendees" ADD CONSTRAINT "dailyAttendees_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "stayAtHome" ADD CONSTRAINT "stayAtHome_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
