package com.manlier.ajax;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by manlier on 2016/9/11.
 */
@WebServlet(urlPatterns = {"/response"}, initParams = {
    @WebInitParam(name = "future", value = "get")
})
public class Response extends HttpServlet{


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        resp.setContentType("text/plain");
//        resp.setContentType("application/json");
        resp.setContentType("text/xml");
        resp.getWriter().append(generateData().toString()).close();
    }

    private Object generateData() {
//        Map<String, Object> map = new HashMap<>();
//        map.put("a", "apple");
//        List<Map<String, Object>> datas = new ArrayList<>();
//        datas.add(map);
//        return new Gson().toJson(datas, new TypeToken<List<Map<String, Object>>>(){}.getType());
        return "<a href='http://www.google.com'>Google</a>";
    }
}
