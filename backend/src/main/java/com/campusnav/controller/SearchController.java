package com.campusnav.controller;

import com.campusnav.model.Location;
import com.campusnav.service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public List<Location> searchLocations(@RequestParam(required = false) String q, @RequestParam(required = false) String category) {
        return searchService.search(q, category);
    }
}
