CREATE SEQUENCE public.visits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.visits_id_seq OWNER TO freerad2_special;

CREATE TABLE public.visits (
    id integer DEFAULT nextval('public.visits_id_seq'::regclass) NOT NULL,
    name text,
    rough_date text,
    fact boolean,
    land_id integer,
    plant_history_event_id integer,
    order_reference text,
    count integer,
    layout integer
);

ALTER TABLE public.visits OWNER TO freerad2_special;

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_land_id_fk FOREIGN KEY (land_id) REFERENCES public.lands(id);

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_plant_history_events_fk FOREIGN KEY (plant_history_events) REFERENCES public.FK_TABLE_NAME_NOT_FOUND(id);
