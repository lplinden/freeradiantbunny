CREATE SEQUENCE public.ux_design_briefs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_design_briefs_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_design_briefs (
    id integer DEFAULT nextval('public.ux_design_briefs_id_seq'::regclass) NOT NULL,
    project_overview text NOT NULL DEFAULT '',
    purpose_or_mission text NOT NULL DEFAULT '',
    project_goals text NOT NULL DEFAULT '',
    target_audience text NOT NULL DEFAULT '',
    project_objectives text NOT NULL DEFAULT '',
    constraint_mitigation text NOT NULL DEFAULT '',
    actions_user_takes text NOT NULL DEFAULT '',
    design_imperatives text NOT NULL DEFAULT '',
    design_outcomes text NOT NULL DEFAULT '',
    success_measurements text NOT NULL DEFAULT '',
    history_of_use_case text NOT NULL DEFAULT '',
    solution_analysis text NOT NULL DEFAULT '',
    prompts_id integer NOT NULL
);

ALTER TABLE public.ux_design_briefs OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_design_briefs
    ADD CONSTRAINT ux_design_briefs_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_design_briefs
    ADD CONSTRAINT ux_design_briefs_id_unique UNIQUE (prompts_id);
    
