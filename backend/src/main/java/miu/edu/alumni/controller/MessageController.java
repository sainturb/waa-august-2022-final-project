package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.service.MessageServiceImpl;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("public")
public class MessageController {

    private final MessageServiceImpl messageService;

    @PostMapping("{topic}")
    public void broadcastNews(@PathVariable String topic) {
        messageService.sendNewAd(topic);
    }
}
