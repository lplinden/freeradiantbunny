
--
-- Name: search(text); Type: FUNCTION; Schema: public; Owner: freerad2_special
--

CREATE FUNCTION public.search(queryterm text) RETURNS TABLE(classname text, classprimarykey text, id integer, img text, nameurl text, description text)
    LANGUAGE plpgsql
    AS $$

DECLARE

myrecord RECORD;
myquery1 text;
myquery2 text;
myrows RECORD;

BEGIN

myquery1 := 'SELECT search_indexes.id, search_indexes.class_name_string, search_indexes.class_primary_key_string FROM search_indexes where search_indexes.name ilike ''%' || quote_ident(queryterm) || '%'';';

FOR myrecord IN execute myquery1

LOOP

  myquery2 := 'SELECT cast(''' || myrecord.class_name_string || ''' as text) as classname, cast(''' || myrecord.class_primary_key_string || ''' as text) as classprimarykey, id, img_url as img, concat(''<a href="'', ''' || myrecord.class_name_string || ''', ''/'', ''' || myrecord.class_primary_key_string || ''', ''">'', name, ''</a>'') as nameurl, description from ' || myrecord.class_name_string || ' where id = ' || myrecord.class_primary_key_string || ';';

  RETURN QUERY EXECUTE myquery2;

END LOOP;

END;
$$;


ALTER FUNCTION public.search(queryterm text) OWNER TO freerad2_special;
