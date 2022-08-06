package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.FileEntity;
import miu.edu.alumni.service.FileServiceImpl;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class FileController {

    private final FileServiceImpl service;

    @PostMapping("/upload/{ad}")
    public FileEntity uploadFile(@PathVariable Long ad, @RequestParam("file") MultipartFile multipartFile) throws IOException {
        return service.upload(ad, multipartFile);
    }

    @GetMapping("/download/{ad}/{id}")
    public ResponseEntity<FileSystemResource> downloadFile(@PathVariable Long ad, @PathVariable Long id) throws IOException {
        FileEntity fileEntity = service.downloadById(ad, id);
        File file = new File(String.format("%s/%s", fileEntity.getLocation(), fileEntity.getName()));
        long fileLength = file.length(); // this is ok, but see note below

        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setContentType(MediaType.parseMediaType(fileEntity.getType()));
        respHeaders.setContentLength(fileLength);
        respHeaders.setContentDispositionFormData("attachment", fileEntity.getOriginalName());

        return new ResponseEntity<FileSystemResource>(
                new FileSystemResource(file), respHeaders, HttpStatus.OK
        );
    }

    @GetMapping("/download/location/{ad}/{name}")
    public ResponseEntity<FileSystemResource> downloadFileByName(@PathVariable Long ad, @PathVariable String name) throws IOException {
        FileEntity fileEntity =  service.downloadByName(ad, name);
        File file = new File(String.format("%s/%s", fileEntity.getLocation(), fileEntity.getName()));
        long fileLength = file.length(); // this is ok, but see note below

        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setContentType(MediaType.parseMediaType(fileEntity.getType()));
        respHeaders.setContentLength(fileLength);
        respHeaders.setContentDispositionFormData("attachment", fileEntity.getOriginalName());

        return new ResponseEntity<FileSystemResource>(
                new FileSystemResource(file), respHeaders, HttpStatus.OK
        );
    }
}
