package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.FileEntity;
import miu.edu.alumni.service.FileServiceImpl;
import miu.edu.alumni.service.FilesStorageService;
import miu.edu.alumni.service.FilesStorageServiceImpl;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
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
    private final FilesStorageServiceImpl storage;

    @PostMapping("/upload/{ad}")
    public FileEntity uploadFile(@PathVariable Long ad, @RequestParam("file") MultipartFile multipartFile) throws IOException {
        FileEntity fileEntity = service.upload(ad, multipartFile);
        storage.save(fileEntity.getName(), multipartFile);
        return fileEntity;
    }

    @GetMapping("/download/{ad}/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long ad, @PathVariable Long id) throws IOException {
        FileEntity fileEntity = service.downloadById(ad, id);
        return downloadFileByName(ad, fileEntity.getName());
    }

    @GetMapping("/download/location/{ad}/{name}")
    public ResponseEntity<Resource> downloadFileByName(@PathVariable Long ad, @PathVariable String name) throws IOException {
        Resource file = storage.load(name);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + name + "\"").body(file);
    }
}
