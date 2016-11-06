package com.manlier.ajax;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.FileCleanerCleanup;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileCleaningTracker;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by manlier on 2016/9/16.
 */
@WebServlet(urlPatterns = {"/upload"},
    initParams = {
        @WebInitParam(name = "tempPath", value = "E:/Temp"),
            @WebInitParam(name = "destination", value = "E:/Temp/Files/")
    }
)
@MultipartConfig
public class FileUpload extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean isMultipart = ServletFileUpload.isMultipartContent(req);

        ServletFileUpload upload = getUpload(getServletContext());
        try (PrintWriter writer = resp.getWriter()) {
            List<FileItem> items = upload.parseRequest(req);
            items.stream()
                    .filter(fileItem -> !fileItem.isFormField())
                    .forEach(fileItem -> {
                        try {
                            fileItem.write(new File(getInitParameter("destination") + fileItem.getName()));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });

        } catch (FileUploadException e) {
            resp.sendError(500, e.getMessage());
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    private ServletFileUpload getUpload(ServletContext context) {
        DiskFileItemFactory factory = new DiskFileItemFactory();
        FileCleaningTracker tracker = FileCleanerCleanup.getFileCleaningTracker(context);
        factory.setFileCleaningTracker(tracker);
        File repository = new File(getInitParameter("tempPath"));
        factory.setRepository(repository);
        return new ServletFileUpload(factory);
    }
}
