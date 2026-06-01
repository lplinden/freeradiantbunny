-- version 0.0.7
CREATE SEQUENCE public.applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.applications_id_seq OWNER TO freerad2_special;

CREATE TABLE public.applications (
    id integer DEFAULT nextval('public.application_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    sort text  NOT NULL,
    url text,
    url_external text,
    inhouse boolean,
    approved boolean
);

ALTER TABLE public.applications OWNER TO freerad2_special;

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_name_unique UNIQUE (name);

SELECT pg_catalog.setval('public.applications_id_seq', 238, true);

COMMENT ON TABLE applications IS 'The applications tables stores information for applications, software, code, scripts, and programs.';	

COMMENT ON COLUMN applications.img_url IS 'The url of the image file that represents the applications icon.';

COMMENT ON COLUMN applications.sort IS 'The specially-coded timestamp signifying last date used.';

COMMENT ON COLUMN applications.status IS 'The year that a given applications has been approved.';

COMMENT ON COLUMN applications.url IS 'The url of the applications points to the homepage of the documentation.';    

COMMENT ON COLUMN applications.url_external IS 'The url_external of the application represents an orgaanizations homepage.'; 
