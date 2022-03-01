CREATE TABLE public.usernames (
    id integer NOT NULL,
    username character varying(12) NOT NULL,
    email_address_id text NOT NULL,
    password character(100) NOT NULL,
    coded_cookie_word text
);

ALTER TABLE public.usernames OWNER TO freerad2_special;
