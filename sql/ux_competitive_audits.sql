CREATE SEQUENCE public.ux_competitive_audits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_competitive_audits_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_competitive_audits (
    id integer DEFAULT nextval('public.ux_competitive_audits_id_seq'::regclass) NOT NULL,
    competitor_1_url text NOT NULL DEFAULT '',
    competitor_1_unique text NOT NULL DEFAULT '',
    competitor_1_swot text NOT NULL DEFAULT '',
    competitor_2_url text NOT NULL DEFAULT '',
    competitor_2_unique text NOT NULL DEFAULT '',
    competitor_2_swot text NOT NULL DEFAULT '',
    competitor_3_url text NOT NULL DEFAULT '',
    competitor_3_unique text NOT NULL DEFAULT '',
    competitor_3_swot text NOT NULL DEFAULT '',
    competitor_4_url text NOT NULL DEFAULT '',
    competitor_4_unique text NOT NULL DEFAULT '',
    competitor_4_swot text NOT NULL DEFAULT '',
    prompts_id integer NOT NULL
);

ALTER TABLE public.ux_competitive_audits OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_competitive_audits
    ADD CONSTRAINT ux_competitive_audits_pk PRIMARY KEY (id);
