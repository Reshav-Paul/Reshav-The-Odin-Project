class Book
# write your code here
    def initialize()
        @title = ""
    end
    
    def title
        @title
    end

    def title=(title)
        words = title.split
        newWords = []
        words.length.times do |i|
            word = words[i]
            if i == 0 || word == "i"
                word = word.capitalize
            else
                if word != 'a' && word != 'an' && word != 'the' && word != 'in' && word != 'and' && word != 'of'
                    word = word.capitalize
                end
            end
            newWords << word
        end
        @title = newWords.join(' ')
    end
end

# @book = Book.new
# @book.title = "inferno"
# @book.title = "The Man in the Iron Mask"
# @book.title = "What I Wish I Knew When I Was 20"