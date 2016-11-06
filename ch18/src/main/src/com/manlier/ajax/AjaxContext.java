package com.manlier.ajax;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by manlier on 2016/9/11.
 */
@WebServlet("/ajax/*")
public class AjaxContext extends HttpServlet{

    private Pattern modals = Pattern.compile("(/\\w+)+?");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        Matcher matcher = modals.matcher(req.getPathInfo());
        if(matcher.find()) {
            req.getRequestDispatcher(matcher.group(1)).forward(req, resp);
        } else {
            resp.sendError(404, "Not found such processor");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
