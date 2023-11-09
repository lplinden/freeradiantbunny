CREATE SEQUENCE public.ux_visual_elements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_visual_elements_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_visual_elements (
    id integer DEFAULT nextval('public.ux_visual_elements_id_seq'::regclass) NOT NULL,
     avatars text NOT NULL DEFAULT '',
     badges text NOT NULL DEFAULT '',
     banners text NOT NULL DEFAULT '',
     buttons text NOT NULL DEFAULT '',
     cards text NOT NULL DEFAULT '',
     chips text NOT NULL DEFAULT '',
     dialogs text NOT NULL DEFAULT '',
     icons text NOT NULL DEFAULT '',
     lists text NOT NULL DEFAULT '',
     modals text NOT NULL DEFAULT '',
     navigation_drawer text NOT NULL DEFAULT '',
     progress_bars text NOT NULL DEFAULT '',
     sliders text NOT NULL DEFAULT '',
     snackbars text NOT NULL DEFAULT '',
     spinners text NOT NULL DEFAULT '',
     steppers text NOT NULL DEFAULT '',
     tabs text NOT NULL DEFAULT '',
     toolbars text NOT NULL DEFAULT '',
     tooltips text NOT NULL DEFAULT '',
     typography text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_visual_elements OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_visual_elements
    ADD CONSTRAINT ux_visual_elements_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_visual_elements
    ADD CONSTRAINT ux_visual_elements_prompts_id_unique UNIQUE (prompts_id);
    
