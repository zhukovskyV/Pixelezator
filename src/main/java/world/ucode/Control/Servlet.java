package world.ucode.Control;

import org.apache.commons.codec.binary.Base64;
import javax.imageio.ImageIO;
import javax.servlet.http.Part;
import java.awt.image.BufferedImage;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;
import java.io.*;
import com.google.gson.Gson;
import world.ucode.Model.Picture;

@WebServlet("/upload")
@MultipartConfig
public class Servlet extends HttpServlet {
    private static final double[] pixel = new double[4];
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter printWriter = resp.getWriter();
        Part part = req.getPart("file");
        String pixSize = req.getHeader("pixSize");
        String imageJson = imageBytesToJson(part, Integer.parseInt(pixSize));

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        printWriter.print(imageJson);
        printWriter.close();
    }

    private void pixelizatingImageKubes(Raster src, WritableRaster dest, int pixSize) {
        for (int y = 0; y < src.getHeight(); y += pixSize) {
            for (int x = 0; x < src.getWidth(); x += pixSize) {
                src.getPixel(x, y, pixel);
                for (int yd = y; (yd < y + pixSize) && (yd < dest.getHeight()); yd++) {
                    for (int xd = x; (xd < x + pixSize) && (xd < dest.getWidth()); xd++) {
                        dest.setPixel(xd, yd, pixel);
                    }
                }
            }
        }
    }

    private BufferedImage pixelizatingImage(InputStream inputStream, int pixSize) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(inputStream);
        Raster src = bufferedImage.getData();
        WritableRaster dest = src.createCompatibleWritableRaster();

        pixelizatingImageKubes(src, dest, pixSize);
        bufferedImage.setData(dest);
        return bufferedImage;
    }

    String imageBytesToJson(Part part, int pixSize) throws IOException {
        String imageInString;
        Picture picture = new Picture();
        byte[] bytes;
        InputStream inputStream = part.getInputStream();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        BufferedImage bufferedImage = pixelizatingImage(inputStream, pixSize);

        ImageIO.write(bufferedImage, "png", baos);

        bytes = baos.toByteArray();
        imageInString = Base64.encodeBase64String(bytes);
        picture.setImage(imageInString);
        return gson.toJson(picture);
    }
}
