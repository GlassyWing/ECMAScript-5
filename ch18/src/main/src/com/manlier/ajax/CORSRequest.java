package com.manlier.ajax;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by manlier on 2016/9/17.
 */
@WebServlet("/cors")
public class CORSRequest extends HttpServlet {

    @Override
    protected void doHead(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String origin = req.getHeader("origin");
        if(origin.equals("http://localhost:63342")) {
            resp.setContentType("image/jpeg");
            resp.setContentLength(304);
            resp.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");
            resp.setHeader("Access-Control-Allow-Headers", "HEAD,GET,POST");
        }
    }
}
