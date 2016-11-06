package com.manlier.ajax;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * Created by manlier on 2016/9/16.
 */
@WebServlet("/download")
public class FileDownload extends HttpServlet {

    private static String testFile = "E:\\wallpapers\\33.jpg";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        FileChannel channel = new FileInputStream(testFile)
                .getChannel();

        resp.setContentType(getServletContext().getMimeType(testFile));
        resp.setHeader("Content-disposition", "attachment;filename=\""+"some.jpg" + "\"");
        resp.setContentLength((int)channel.size());
        BufferedOutputStream out = new BufferedOutputStream(resp.getOutputStream());
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        while (channel.read(buffer) != -1) {
            out.write(buffer.array());
            buffer.rewind();
        }
        channel.close();
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    public static void main(String[] args) throws IOException {

    }
}
