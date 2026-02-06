// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// requests- models the incoming requests data

#[doc = "This is the structure for a Requests instance."]
pub struct Requests {
    pub list: Vec<Request>,
    pub count: usize,
}

#[doc = "This is the structure for a Request instance."]
pub struct Request {
    pub num: i32,
    pub method: String,
    pub path_query_fragment: String,
    pub http_version: String,
}

#[doc = "Request implementation."]
impl Request {
    #[doc = "Getter function."]
    pub fn get_num(&self) -> i32 {
        self.num
    }
    #[doc = "Getter function."]
    pub fn get_method(&self) -> String {
        self.method.to_string()
    }
    #[doc = "Getter function."]
    pub fn get_path_query_fragment(&self) -> String {
        self.path_query_fragment.to_string()
    }
    #[doc = "Getter function."]
    pub fn get_http_version(&self) -> String {
        self.http_version.to_string()
    }
    #[doc = "Function to return a pretty string of the data of the struct."]
    pub fn get_pretty(&self) -> String {
        let pretty_string = format!(
            "request: (\n\t   num: {},\n\t   method: '{}',\n\t   path_query_fragment: '{}',\n\t   http_version: '{}')",
            self.get_num().to_string(),
            self.get_method(),
            self.get_path_query_fragment(),
            self.get_http_version()
        );
        pretty_string
    }
}

#[doc = "TryFrom for Request struct."]
impl TryFrom<String> for Request {
    // error variable
    type Error = String;
    // try_from
    fn try_from(request: String) -> Result<Self, Self::Error> {
        // create this counter
        let num = 1;
        let mut method = "".to_string();
        let mut path_query_fragment = "".to_string();
        let mut http_version = "".to_string();
        // collect the lines of the request and stuff 'em in a vector
        let lines: Vec<&str> = request.lines().collect();
        // count how many lines need to be dealt with
        let lines_len = lines.len();
        // decide how to proceed
        if lines_len == 0 {
            // throw error
            let request_error_debug =
                format!("Request try_from error: failed due to invalid request.");
            // return
            return Err(request_error_debug);
        } else if lines.len() >= 1 {
            // get first line
            let request_line = lines[0].trim();
            // debug
            //println!("request debug: request_line index 0: '{}'", request_line);
            let request_parts: Vec<&str> = request_line.split_whitespace().collect();
            // try to avoid index error
            if request_parts.len() == 0 {
                let error_message = format!("requests error: invalid request:\n{}", request);
                // return
                return Err(error_message);
            }
            // with that out of the way something might be requested
            // investigate further
            if request_parts.len() >= 3 {
                // get first three parts
                // get the inbound data
                method = request_parts[0].to_string();
                path_query_fragment = request_parts[1].to_string();
                http_version = request_parts[2].to_string();
            }
        } else if lines.len() >= 2 {
            // get second line
            //request_line = lines[1].trim();
            // debug
            println!("request error:  request_line index 1: '{}'", lines.len());
        }
        // return request instance encased in request syntax
        Ok(Self {
            num,
            method,
            path_query_fragment,
            http_version,
        })
    }
}

/* end */
