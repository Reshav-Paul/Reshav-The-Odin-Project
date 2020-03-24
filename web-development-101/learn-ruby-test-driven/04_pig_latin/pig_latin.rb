#write your code here
def translate(text)
	words = text.split(" ")
	new_words = []
	words.length.times do |i|
		new_words << getPigLatin(words[i])
	end
	new_words.join(" ")
end

def getPigLatin(word)
	vowel_pattern = /^[aeiou]+/i
	consonant_pattern = /^[^aeiou]+/i
    qu_pattern = /[^aeiou]*qu/i
    ret_word = ""
	if word.match(qu_pattern)
		first_index = word =~ qu_pattern
		split_index = first_index + word[qu_pattern].length
		puts first_index
		puts word[qu_pattern]
		puts word[qu_pattern].length
		puts split_index
		ret_word = word[split_index...] + word[0...split_index] + "ay"
	elsif word.match(vowel_pattern)
		ret_word = word + "ay"
	elsif word.match(consonant_pattern)
		first_index = word =~ consonant_pattern
		split_index = first_index + word[consonant_pattern].length
		ret_word = word[split_index...] + word[0...split_index] + "ay"
	end
	ret_word
end

puts translate("quiet")