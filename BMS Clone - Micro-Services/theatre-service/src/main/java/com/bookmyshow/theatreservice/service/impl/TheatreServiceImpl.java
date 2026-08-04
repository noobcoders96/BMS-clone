package com.bookmyshow.theatreservice.service.impl;

import com.bookmyshow.theatreservice.client.CatalogClient;
import com.bookmyshow.theatreservice.dto.ShowResponse;
import com.bookmyshow.theatreservice.entity.Show;
import com.bookmyshow.theatreservice.repository.ShowRepository;
import com.bookmyshow.theatreservice.service.TheatreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TheatreServiceImpl implements TheatreService {

    private final ShowRepository showRepository;
    private final CatalogClient catalogClient;

    @Override
    public List<ShowResponse> getShowsByMovie(String movieId) {

        // Validate movie exists in Catalog Service
        catalogClient.getMovieById(movieId);

        List<Show> allShows = showRepository.findAllNative();

        System.out.println("Total Shows = " + allShows.size());

        for (Show show : allShows) {
            System.out.println(show.getMovieId());
        }

        List<Show> shows = showRepository.findByMovieId(movieId);

        System.out.println("Movie ID = " + movieId);
        System.out.println("Shows found = " + shows.size());


        return shows.stream()
                .map(show -> ShowResponse.builder()
                        .showId(show.getShowId())
                        .theatreName(show.getScreen().getTheatre().getName())
                        .screenName(show.getScreen().getScreenName())
                        .showTime(show.getShowTime())
                        .price(show.getPrice())
                        .build())
                .toList();
    }
}