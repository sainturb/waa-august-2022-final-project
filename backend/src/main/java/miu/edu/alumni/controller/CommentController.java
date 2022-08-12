package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Comment;
import miu.edu.alumni.service.CommentServiceImpl;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentServiceImpl commentService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Comment> findCommentsByStudent(@PathVariable Long id) {
        return commentService.findCommentsByStudent(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Comment save( @RequestBody Comment comment) {
        return commentService.save(comment);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Comment update(@PathVariable Long id, @RequestBody Comment comment) {
        comment.setId(id);
        return commentService.update(comment);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public void update(@PathVariable Long id) {
        commentService.delete(id);
    }
}
