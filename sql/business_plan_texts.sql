CREATE SEQUENCE public.business_plan_texts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.business_plan_texts_id_seq OWNER TO freerad2_special;

CREATE TABLE public.business_plan_texts (
    id integer DEFAULT nextval('public.business_plan_texts_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    goal_statements_id integer,
    order_by text
);

ALTER TABLE public.business_plan_texts OWNER TO freerad2_special;

ALTER TABLE ONLY public.business_plan_texts
    ADD CONSTRAINT business_plan_texts_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.business_plan_texts
    ADD CONSTRAINT business_plan_texts_goal_statements_id_fk FOREIGN KEY (goal_statements_id) REFERENCES public.goal_statements(id);
