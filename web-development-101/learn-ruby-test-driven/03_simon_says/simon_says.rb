#write your code here
def echo(msg)
    msg
end

def shout(msg)
    msg.upcase
end

def repeat(msg, times = 2)
    r = ""
    (times - 1).times do
        r = r + msg + " ";
    end
    r + msg
end

def start_of_word(msg, i)
    msg[0...i]
end

def first_word(msg)
    msg.split()[0]
end

def titleize(msg)
    words = msg.split
    newWords = []
    words.length.times do |i|
        word = words[i]
        if i == 0 || i == (words.length - 1)
            word = word.capitalize
        else
            if word.length > 4
                word = word.capitalize
            end
        end
        newWords << word
    end
    newWords.join(' ')
end


