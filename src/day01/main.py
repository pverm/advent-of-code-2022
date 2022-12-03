with open("input.txt", "r") as f: print(sum(sorted([sum(map(lambda x: int(x), b.strip().split("\n"))) for b in f.read().split("\n\n")])[-3:]))
