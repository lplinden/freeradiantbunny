CREATE SEQUENCE public.ux_responsive_layouts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_responsive_layouts_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_responsive_layouts (
    id integer DEFAULT nextval('public.ux_responsive_layouts_id_seq'::regclass) NOT NULL,
     project_aims text NOT NULL DEFAULT '',
     mobile_portrait text NOT NULL DEFAULT '',
     mobile_landscape text NOT NULL DEFAULT '',
     phablets text NOT NULL DEFAULT '',
     tablets text NOT NULL DEFAULT '',
     small_laptops text NOT NULL DEFAULT '',
     medium_sized_desktops text NOT NULL DEFAULT '',
     large_desktops text NOT NULL DEFAULT '',
     extra_large_desktops text NOT NULL DEFAULT '',
     full_hd_displays text NOT NULL DEFAULT '',
     four_k_displays text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_responsive_layouts OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_responsive_layouts
    ADD CONSTRAINT ux_responsive_layouts_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_responsive_layouts
    ADD CONSTRAINT ux_responsive_layouts_prompts_id_unique UNIQUE (prompts_id);
