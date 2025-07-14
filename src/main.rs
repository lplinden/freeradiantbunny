// version 0.0.5

// import
use rand::Rng;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

// freeradiantbuny module
pub mod freeradiantbunny;

// server is entrace and exit
use crate::freeradiantbunny::controller::server;

// constant
use crate::freeradiantbunny::site_configuration::site_configuration::IP_ADDRESS_AND_PORT;

#[doc = "This is the main() function of the application. This function uses a TcpListener and may spawn thread."]
fn main() -> std::io::Result<()> {
    // bind to a specific IP address and port
    let listener = TcpListener::bind(IP_ADDRESS_AND_PORT)?;
    println!("freeradiantbunny main() debug: listening for incoming connections.");

    // accept incoming connections and handle each one in a new thread
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                // stream Ok, so configure the thread
                // generate a serial number for the thread
                let mut rng = rand::thread_rng();
                let rand_thread_id: u8 = rng.gen();
                let rand_thread_id_string: String = format!("{}", rand_thread_id);

                // spawn a new thread
                // name thread with serial number from above
                // the purpose of the thread is to to handle each connection with request
                thread::Builder::new()
                    .name(rand_thread_id_string)
                    .spawn(move || {
                        if let Err(err) = handle_request(stream) {
                            eprintln!(
                                "freeradiantbunny main() error: failed handling request: rand_thread_id_string: err: {}",
                                err
                            );
                        }
                    })
                    .expect("freeradiantbunny main() error: failed to handle Builder new(): rand_thread_id_string.",
                    );
            }
            Err(err) => {
                eprintln!(
                    "freeradiantbunny main() error: failed accepting connection: err: {}",
                    err
                );
            }
        }
    }
    Ok(())
}

#[doc = "This private function handles the request by take the stream as an argument and making it into an instance of a Request struct. And then, the function calls another function to create a response. When the response is returned the result is written to a stream."]
fn handle_request(mut stream: TcpStream) -> Result<(), std::io::Error> {
    // declare a buffer and read stream
    let mut buffer = [0; 1024];
    stream
        .read(&mut buffer)
        .expect("freeradiantbunny main() error: failed stream read.");

    // convert the received bytes to a string
    let request_data = String::from_utf8_lossy(&buffer).to_string();

    // use freeradiantbunny to create a response
    let response = server::serve_webpage(&request_data);

    // write the response
    stream.write_all(response.as_bytes()).expect(
        "freeradiantbunny main() error: failed stream write_all: rand_thread_id_string: {}",
    );

    // clean up the stream
    stream
        .flush()
        .expect("freeradiantbunny main() error: failed stream flush: rand_thread_id_string: {}");
    Ok(())
}
